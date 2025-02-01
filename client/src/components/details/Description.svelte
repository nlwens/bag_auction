<script>
    import Countdown from './Countdown.svelte';
    export let bag;
    import { currentPrice } from '../../WritableStore';
    $: currentPrice.set(bag.currentPrice || bag.startPrice);
</script>

<div id="description-container">
    <h1>{bag.name}</h1>
    <h3>
        {#if bag.currentPrice === undefined}
            Start From: € {bag.startPrice}
        {:else if new Date(bag.endDate) < new Date()}
            Sold at: € {$currentPrice}
        {:else}
            Current Price: €{$currentPrice}
        {/if}
    </h3>
    <p class="end-date">
        <Countdown endDate={bag.endDate} />
    </p>
    <p>
        Size: {bag.size}
    </p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</div>

<style>
    #description-container{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        padding: 10px;
        text-align: left;
    }
    h1 {
        margin: 2rem 0
    }
    h3 {
        margin-bottom: 2rem;
    }
    p {
        font-style: italic;
    }
    .end-date {
        font-weight: bold;
        font-size: 16px;
    }

</style>