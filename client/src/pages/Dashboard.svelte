<script>
    import DashboardItem from "../components/DashboardItem.svelte";

    let bags = [];
    let filteredBags = [];
    let loggedInId = localStorage.getItem("userId");
    let errorMsg = null;
    let total = 0;

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    async function fetchBags() {
        try {
            let url = new URL('http://localhost:3000/bags');
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

            filteredBags = bags.filter(bag =>
                bag.lastBidderId === parseInt(userId) && new Date(bag.endDate) < new Date()
            );
            total = filteredBags.reduce((sum, bag) => sum + bag.currentPrice, 0);

            console.log(filteredBags);
        } catch (error) {
            console.log("error: " + error);
            throw error;
        }
    }
</script>

<div>
    {#if loggedInId !== userId}
        <p class="notice">You can only visit your own dashboard.</p>
    {:else}
        {#await fetchBags() then _}
            <div>
                {#if filteredBags.length > 0}
                    <div class="dashboard-table">
                        <div class="dashboard-table-header">
                            <div>Item</div>
                            <div>Name</div>
                            <div>End Date</div>
                            <div>Price</div>
                        </div>

                        {#each filteredBags as bag}
                            <DashboardItem {bag}></DashboardItem>
                        {/each}

                        <div class="dashboard-table-header">
                            <div></div>
                            <div></div>
                            <span class="total">Total:</span>
                            €{total}
                        </div>
                    </div>
                {:else}
                    <p class="notice">You haven't won any auction!</p>
                {/if}
            </div>
        {:catch error}
            <p class="backend-error-text">{errorMsg}</p>
        {/await}
    {/if}
</div>

<style>
    .dashboard-table {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    .dashboard-table-header {
        display: grid;
        grid-template-columns: 100px 1fr 1fr 1fr;
        gap: 20px;
        font-weight: bold;
        background-color: #f7f7f7;
        padding: 10px;
        border-bottom: 2px solid #e0e0e0;
        text-align: center;
    }

    .notice {
        color: #ff6b6b;
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
</style>
