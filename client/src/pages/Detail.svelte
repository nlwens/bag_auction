<script>
    import Image from "../components/details/Image.svelte";
    import Description from "../components/details/Description.svelte";
    import Bid from "../components/details/Bid.svelte";
    import Upload from "../components/Upload.svelte";
    import Delete from "../components/details/Delete.svelte";

    let isAdmin = localStorage.getItem("isAdmin");
    let lastBidAmount = 0;
    let bagId;
    let bag;
    let bids = [];
    let startPrice;
    let showUpload = false;
    let errorMsg = null;

    let updateData = {
        bagId:'',
        name: '',
        brand: '',
        country: '',
        color: '',
        endDate: '',
        startPrice: '',
        size: '',
        src: '',
    };

    async function fetchBag() {
        const urlParams = new URLSearchParams(window.location.search);
        bagId = urlParams.get('id');

        try{
            const response = await fetch(`http://localhost:3000/bags/${bagId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                errorMsg = errorData.error ;
            }

            bag = await response.json();
            startPrice = bag.startPrice;
            if (bag.currentPrice !== undefined){
                lastBidAmount = bag.currentPrice
            }

            updateData = {
                bagId: bagId,
                name: bag.name,
                brand: bag.brand,
                country: bag.country,
                color: bag.color,
                endDate: bag.endDate,
                startPrice: bag.startPrice,
                size: bag.size,
                src: bag.src
            };

            await fetchBids();
        } catch (error) {
            console.log("error: " + error);
            throw error;
        }
    }

    async function fetchBids(bagId) {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)
        bagId = urlParams.get('id');

        try{
            const response = await fetch(`http://localhost:3000/bags/${bagId}/bids`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                errorMsg = errorData.error;
            }

            bids = await response.json();
        } catch (error) {
            console.log("error: " + error);
        }
    }

    function handleNewBid(event) {
        console.log(event.detail);
        lastBidAmount = event.detail;
    }

    function openUpload() {
        showUpload = true;
    }
</script>

{#await fetchBag() then bagData}
    <div id="main-container">
        <Image {bag}></Image>
        <Description {bag}></Description>
        <div>
            <Bid {lastBidAmount} {bagId} {bids} {startPrice} on:newBid={handleNewBid}/>
            {#if isAdmin === "true"}
                <span class="modify-text" on:click={openUpload}>modify this item</span>
                <span>/</span>
                <Delete {bagId}></Delete>
            {/if}
        </div>
        {#if showUpload}
            <Upload {updateData} {showUpload} on:close={() => showUpload = false} method="PUT" />
        {/if}
    </div>
{:catch error}
    <p class="backend-error-text">{errorMsg}</p>
{/await}

<style>
    #main-container{
        display: grid;
        grid-template-columns: 1fr 1fr 0.7fr;
        gap: 5rem;
        margin: 2rem;
        opacity: 0;
        animation: fadeIn 2s forwards;
    }
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
    .modify-text {
        cursor: pointer;
        text-decoration: underline;
    }

</style>