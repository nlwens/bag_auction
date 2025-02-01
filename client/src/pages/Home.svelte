<script>
    import Item from "../components/Item.svelte";
    import Filter from "../components/Filter.svelte";

    let query = '';
    let selectedColor = '';
    let selectedBrand = '';
    let selectedSize = '';
    let bags = [];
    let filteredBags = [];
    let errorMsg = null;

    $: filteredBags = bags
        .filter(bag => bag.name.toLowerCase().includes(query.toLowerCase()))

    async function fetchBags() {
        try{
            let url = new URL('http://localhost:3000/bags');
            if (selectedColor) url.searchParams.append('color', selectedColor);
            if (selectedBrand) url.searchParams.append('brand', selectedBrand);
            if (selectedSize) url.searchParams.append('size', selectedSize);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                errorMsg = errorData.error;
            }

            bags = await response.json();
        } catch (error) {
            console.log("error: " + error);
            throw error;
        }
    }

    $: colors = [...new Set(bags.map(bag => bag.color))];
    $: brands = [...new Set(bags.map(bag => bag.brand))];
    $: size = [...new Set(bags.map(bag => bag.size))];

    function handleColorSelect(color) {
        selectedColor = color;
        fetchBags();
    }

    function handleBrandSelect(brand) {
        selectedBrand = brand;
        fetchBags();
    }

    function handleSizeSelect(size) {
        selectedSize = size;
        fetchBags();
    }
</script>

<main>

<div id="body">
    <div id="filter_container">
        <Filter
                label="Color"
                options={colors}
                selectedValue={selectedColor}
                onSelect={handleColorSelect}
        />
        <Filter
                label="Brand"
                options={brands}
                selectedValue={selectedBrand}
                onSelect={handleBrandSelect}
        />
        <Filter
                label="Size"
                options={size}
                selectedValue={selectedSize}
                onSelect={handleSizeSelect}
        />
    </div>
    <input class="search-box" type="search" bind:value={query} placeholder="Search..."/>
    <div id="items_container">
        {#await fetchBags() then fetchedBags}
            {#each filteredBags as bag}
                <Item {bag}></Item>
            {/each}
        {:catch error}
            <p class="backend-error-text">Error: {error.message}</p>
        {/await}
    </div>
</div>

</main>

<style>
    #body{
        display: grid;
        grid-template-columns: auto 1fr;
    }

    #filter_container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 20px;
        min-width: 200px;
        grid-row: span 2;
    }

    .search-box {
        padding: 10px 15px;
        width: 95%;
        margin: 0 0 1.5rem 2rem;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .search-box::placeholder {
        color: #aaa;
        opacity: 1;
    }

    #items_container{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        opacity: 0;
        animation: fadeIn 2s forwards;
    }

    @media (max-width: 1200px) {
        #items_container {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 800px) {
        #items_container {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }

    :global(.backend-error-text) {
        color: #e74c3c;
        font-weight: bold;
        font-size: 5rem;
        margin-top: 1rem;
    }
</style>