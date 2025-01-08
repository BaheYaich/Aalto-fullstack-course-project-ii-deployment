<script lang="ts">
    import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
    import { errorState } from '$lib/state/errorState.svelte';
    
    type FormProps = {
        data: { 
            options: Option[];
            topicId: number;
            questionId: number;
            user: any;
            question_text: string;
        };
        form: { 
            errors?: { form: string };
            data?: { 
                option_text: string;
            };
        } | null;
    };
    
    let props = $props();
    let option_text = $state(props.form?.data?.option_text ?? '');

    type Option = {
        id: number;
        option_text: string;
        is_correct: boolean;
    };

    $effect(() => {
        if (props.form?.errors?.form) {
            errorState.showError(props.form.errors.form);
            option_text = props.form?.data?.option_text ?? option_text;
        }
    });
</script>

<article class="container mx-auto p-8 max-w-3xl">
    <div class="flex justify-between items-center mb-8">
        <a 
            href="/topics/{props.data.topicId}/questions" 
            class="btn variant-ghost-primary"
        >
            ← Back to Questions
        </a>
    </div>

    <ErrorAlert />

    <div class="card p-8 shadow-xl bg-surface-100-800-token space-y-6">
        <h2 class="h2 text-center mb-4 p-4">{props.data.question_text}</h2>
        <form 
            class="add-option-form flex space-x-4" 
            method="POST" 
            action="?/addOption"
        >
            <input 
                class="input flex-grow" 
                name="option_text" 
                type="text" 
                value={option_text}
                placeholder="Enter new option"
                required 
            />
            <button class="btn variant-ghost-primary" type="submit">
                Add Option
            </button>
        </form>

        {#if props.data.options.length > 0}
            <div class="space-y-4">
                <div class="alert variant-ghost-warning">
                    <p>Click on an option to set it as the correct answer for this question.</p>
                </div>
                <h3 class="h3 p-4">Question Options</h3>
                <ul class="space-y-4">
                    {#each props.data.options as option}
                        <li class="flex gap-2">
                            <form 
                                method="POST" 
                                action="?/updateCorrectAnswer"
                                class="flex-grow"
                            >
                                <input type="hidden" name="optionId" value={option.id} />
                                <button 
                                    type="submit"
                                    class="w-full card p-6 flex items-center justify-between
                                           hover:variant-ghost-primary cursor-pointer
                                           {option.is_correct ? 'variant-ghost-success' : ''}"
                                >
                                    <span class="text-surface-900-50-token text-lg">
                                        {option.option_text}
                                    </span>
                                </button>
                            </form>
                            
                            <form method="POST" action="?/deleteOption">
                                <input type="hidden" name="id" value={option.id} />
                                <button 
                                    type="submit" 
                                    class="btn variant-ghost-error rounded-xl h-full"
                                >
                                    Delete
                                </button>
                            </form>
                        </li>
                    {/each}
                </ul>
            </div>
        {:else}
            <p class="text-center text-surface-900-50-token p-4">
                No options have been created.
            </p>
        {/if}
    </div>
</article> 