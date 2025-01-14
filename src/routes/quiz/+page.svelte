<script lang="ts">
    import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
    import { errorState } from '$lib/state/errorState.svelte';

    function generateUniqueGradient() {
        const hue1 = Math.floor(Math.random() * 360);
        const hue2 = (hue1 + 120) % 360;
        const color1 = `hsl(${hue1}, 70%, 60%)`;
        const color2 = `hsl(${hue2}, 70%, 60%)`;
        return `linear-gradient(135deg, ${color1}, ${color2})`;
    }

    type Topic = {
        id: number;
        name: string;
        gradient?: string;
    };

    let props = $props();
    let topicsWithGradients = $state<Topic[]>([]);

    $effect(() => {
        topicsWithGradients = props.data.topics.map((topic: Topic) => ({
            ...topic,
            gradient: generateUniqueGradient()
        }));
    });
</script>

<div class="container mx-auto p-8">
    <article class="relative p-8">
        <h1 class="big-ass-heading gradient-heading p-8">Quiz Topics</h1>
        <ErrorAlert />
    </article>    

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {#each topicsWithGradients as topic}
            <a 
                href={`/quiz/${topic.id}`} 
                class="topic-card relative rounded-xl shadow-lg overflow-hidden 
                       transform transition-all duration-300 
                       hover:scale-105 hover:shadow-2xl p-10 block no-underline"
                style="background: {topic.gradient}"
            >
                <div class="h-full flex items-center justify-center">
                    <h2 class="text-3xl font-bold text-white drop-shadow-md text-center capitalize">
                        {topic.name}
                    </h2>
                </div>
            </a>
        {/each}
    </div>
</div> 