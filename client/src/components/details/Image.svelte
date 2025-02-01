<script>
    export let bag;
</script>

<div class="image-container">
    <img src={bag.src} alt={bag.name} />
</div>

<style>
    .image-container {
        width: 100%;
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>