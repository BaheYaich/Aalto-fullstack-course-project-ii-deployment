<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { fetchQuestionOptions } from '$lib/client/optionService';
    import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
    import { errorState } from '$lib/state/errorState.svelte';

    const modalStore = getModalStore();
    
    let { questionId, questionText } = $props();
    
    let options = $state<Option[]>([]);
    let isLoading = $state(true);
    let showFeedback = $state(false);
    let selectedOptionId = $state<number | null>(null);
    let correctSound = $state<HTMLAudioElement>();
    let incorrectSound = $state<HTMLAudioElement>();

    type Option = {
        id: number;
        option_text: string;
        is_correct: boolean;
    };

    $effect(() => {
        if (!correctSound) correctSound = new Audio('/sounds/correct.mp3');
        if (!incorrectSound) incorrectSound = new Audio('/sounds/incorrect.mp3');
        showFeedback = false;
        selectedOptionId = null;
        loadOptions();
    });

    async function loadOptions() {
        try {
            const fetchedOptions = await fetchQuestionOptions(questionId);
            options = fetchedOptions;
            isLoading = false;
        } catch (error) {
            console.error('Error fetching options:', error);
            errorState.showError('Failed to load options');
            isLoading = false;
        }
    }

    async function handleOptionClick(option: Option) {
        if (showFeedback) return;
        
        selectedOptionId = option.id;
        showFeedback = true;

        if (option.is_correct) {
            await correctSound?.play();
            setTimeout(() => modalStore.close(), 1500);
        } else {
            await incorrectSound?.play();
            setTimeout(() => modalStore.close(), 2500);
        }
    }

    let getOptionClass = $derived((option: Option) => `
        w-full card p-6 flex items-center justify-between
        ${!showFeedback ? 'hover:variant-ghost-primary cursor-pointer' : ''}
        ${showFeedback && option.is_correct ? 'variant-ghost-success' : ''}
        ${showFeedback && !option.is_correct && selectedOptionId === option.id ? 'variant-ghost-error' : ''}
    `);
</script>

<div class="modal-content card p-8 w-modal shadow-xl bg-surface-100-800-token space-y-6">
    <ErrorAlert />
    <h2 class="h2 text-center mb-8">{questionText}</h2>

    {#if showFeedback && !options.find(o => o.id === selectedOptionId)?.is_correct}
        <p class="text-lg text-center text-error-500 mb-4">
            The correct answer was: {options.find(o => o.is_correct)?.option_text}
        </p>
    {/if}

    {#if isLoading}
        <div class="flex justify-center p-4">
            <div class="spinner-overlay"></div>
        </div>
    {:else if options.length > 0}
        <div class="space-y-4">
            {#each options as option}
                <button 
                    class={getOptionClass(option)}
                    onclick={() => handleOptionClick(option)}
                    disabled={showFeedback}
                >
                    <span class="text-surface-900-50-token text-lg">
                        {option.option_text}
                    </span>
                </button>
            {/each}
        </div>
    {:else}
        <p class="text-center text-surface-900-50-token p-4">
            No options available for this question.
        </p>
    {/if}
</div>

<style>
    .variant-ghost-error {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
</style> 