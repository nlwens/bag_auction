<script>
    export let bag;
</script>

    <div>
        <div class="square">
            <a href={`/detail?id=${bag.id}`}>
                <img src={bag.src} alt={bag.name} />
            </a>
        </div>
        {bag.name}
        {#if bag.currentPrice !== undefined}
            {#if new Date(bag.endDate) > new Date()}
                <span class="price">Now at €{bag.currentPrice}</span>
            {:else}
                <span class="price">Sold at €{bag.currentPrice}</span>
            {/if}
        {:else}
            <span class="price">Start from €{bag.startPrice}</span>
        {/if}
    </div>


<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 10px;
        background-color: #f9f9f9;
        max-width: 300px;
        margin: 0 auto;
    }
    .square {
        width: 15rem;
        height: 15rem;
        overflow: hidden;
    }
    .square a {
        display: block;
        height: 100%;
        width: 100%;
    }
    .square img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .price{
        font-weight: bold;
        color: grey;
    }
</style>