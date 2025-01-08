<script lang="ts">
    import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
    import { errorState } from '$lib/state/errorState.svelte';
    
    type FormProps = {
        data: { 
            options: any[];
            topicId: number;
            questionId: number;
            user: any;
        };
        form: { 
            errors?: { form: string };
            data?: { 
                option_text: string;
                is_correct: boolean;
            };
        } | null;
    };
    
    let props = $props();
    let option_text = $state(props.form?.data?.option_text ?? '');
    let is_correct = $state(props.form?.data?.is_correct ?? false);
    let addForm = $state<HTMLFormElement | null>(null);

    $effect(() => {
        if (props.form?.errors?.form) {
            errorState.showError(props.form.errors.form);
            option_text = props.form?.data?.option_text ?? option_text;
            is_correct = props.form?.data?.is_correct ?? is_correct;
        }
    });
</script>

<article class="relative">
    <ErrorAlert />

    <form 
        bind:this={addForm}
        class="form-container flex flex-row gap-2" 
        method="POST" 
        action="?/addOption"
    >
        <input 
            class="input variant-form-material" 
            id="option_text" 
            name="option_text" 
            type="text" 
            bind:value={option_text} 
            required 
        />
        <label class="flex items-center space-x-2">
            <input 
                type="checkbox" 
                name="is_correct" 
                bind:checked={is_correct}
                class="checkbox" 
            />
            <span>Correct Answer</span>
        </label>
        <button class="btn variant-form-material" type="submit">Add Option</button>
    </form>

    {#if props.data.options.length > 0}
        <ul>
            {#each props.data.options as option}
                <li>
                    {option.option_text}
                    <form method="POST" action="?/deleteOption">
                        <input type="hidden" name="id" value={option.id} />
                        <button type="submit" class="btn variant-filled-error">Delete</button>
                    </form>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No options have been created.</p>
    {/if}
</article> 