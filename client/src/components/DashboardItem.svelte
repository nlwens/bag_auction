<script>

    export let bag;
</script>

<div class="dashboard-item">
    <a href={`/detail?id=${bag.id}`}>
        <img src={bag.src} alt={bag.name} />
    </a>

    <a href={`/detail?id=${bag.id}`}>
        <p>{bag.name}</p>
    </a>

    <p>{new Date(bag.endDate).toLocaleDateString()}</p>

    <p class="price">€{bag.currentPrice}</p>
</div>

<style>
    .dashboard-item {
        display: grid;
        grid-template-columns: 100px 1fr 1fr 1fr;
        gap: 20px;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
    }

    .dashboard-item img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
    }

    .dashboard-item p {
        margin: 0;
        font-size: 14px;
    }

    .dashboard-item a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
    }

    .dashboard-item .price {
        font-weight: bold;
        color: #2a9d8f;
    }
</style>