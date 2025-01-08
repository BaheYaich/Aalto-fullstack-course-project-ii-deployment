<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { fetchQuestionOptions } from '$lib/client/optionService';

    const modalStore = getModalStore();
    
    let { topicId, questionId, questionText }: { 
        topicId: number, 
        questionId: number, 
        questionText: string 
    } = $props();
    
    let options = $state<any[]>([]);
    let isLoading = $state(true);
    let loadError = $state<string | null>(null);
    let selectedOption = $state<number | null>(null);
    let isAnswered = $state(false);

    // Sound effects
    let correctSound: HTMLAudioElement;
    let incorrectSound: HTMLAudioElement;

    $effect(() => {
        correctSound = new Audio('/sounds/correct.mp3');
        incorrectSound = new Audio('/sounds/incorrect.mp3');
    });

    $effect(() => {
        async function loadOptions() {
            try {
                const fetchedOptions = await fetchQuestionOptions(questionId);
                options = fetchedOptions;
                isLoading = false;
            } catch (error) {
                console.error('Error fetching options:', error);
                loadError = 'Failed to load options';
                isLoading = false;
            }
        }
        loadOptions();
    });

    function handleOptionSelect(optionId: number, isCorrect: boolean) {
        if (isAnswered) return; // Prevent multiple selections

        selectedOption = optionId;
        isAnswered = true;
        
        const optionElements = document.querySelectorAll('.option-button');
        optionElements.forEach(el => {
            if (el.id !== `option-${optionId}`) {
                el.classList.add('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
            }
        });

        const selectedElement = document.getElementById(`option-${optionId}`);
        if (selectedElement) {
            if (isCorrect) {
                correctSound.play();
                selectedElement.classList.add('border-4', 'border-green-500', 'brightness-110');
            } else {
                incorrectSound.play();
                selectedElement.classList.add('border-4', 'border-red-500', 'animate-shake');
            }
        }

        // Close modal after a short delay to show the feedback
        setTimeout(() => {
            modalStore.close();
        }, 2000);
    }
</script>

<style>
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .animate-shake {
        animation: shake 0.5s;
    }
</style>

<div class="modal-content p-8 bg-surface-500/60 rounded-lg border-4 border-surface-500/70">
    <!-- Question -->
    <div class="mb-8">
        <p class="text-center text-2xl mb-6">
            {questionText}
        </p>
    </div>

    {#if isLoading}
        <p>Loading options...</p>
    {:else if loadError}
        <p class="text-error-500">{loadError}</p>
    {:else if options.length > 0}
        <div class="grid grid-cols-1 gap-6">
            {#each options as option}
                <button 
                    id="option-{option.id}"
                    class="option-button btn variant-filled-surface p-4 text-left border-2 border-transparent text-lg 
                           transition-all duration-200 ease-in-out 
                           hover:brightness-110"
                    onclick={() => handleOptionSelect(option.id, option.is_correct)}
                >
                    {option.option_text}
                </button>
            {/each}
        </div>
    {:else}
        <p>No options have been created.</p>
    {/if}
</div>