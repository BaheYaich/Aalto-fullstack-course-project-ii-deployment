<script lang="ts">
    let props = $props();
</script>

<div class="container mx-auto p-8 text-center">
    <h1 class="big-ass-heading gradient-heading mb-8">
        Quiz Score: {props.data.score}/{props.data.totalQuestions}
    </h1>

    <a 
        href="/quiz/{props.data.topicId}" 
        class="btn variant-ghost-primary"
    >
        Try Again
    </a>
</div> 