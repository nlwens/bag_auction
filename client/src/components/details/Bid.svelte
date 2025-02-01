<script>
    export let lastBidAmount;
    export let bagId;
    export let bids = [];
    export let startPrice;
    import { auctionEnded } from '../../WritableStore';
    import { currentPrice } from '../../WritableStore';

    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    let AuctionEnded = false;
    auctionEnded.subscribe(value => {
        AuctionEnded = value;
    });

    let newBidAmount;
    let errorMessage = "";
    let userId = localStorage.getItem('userId') || '';
    let isAdmin = localStorage.getItem('isAdmin') || '';
    let token = localStorage.getItem('token')||'';

    const isLoggedIn = () => {
        return token !== '';
    };

    function handleBidClick() {
        errorMessage = "";
        if (!isLoggedIn()) {
            const currentUrl = window.location.href;
            localStorage.setItem('beforeLoginUrl', currentUrl);
            window.location.href = '/login';
        } else if (isAdmin === "true") {
            errorMessage = "You can't place a bid as an admin.";
        } else if (newBidAmount % 1 !== 0) {
            errorMessage = "Please type in a whole numbers.";
        } else if (newBidAmount <= lastBidAmount || newBidAmount <= startPrice) {
            errorMessage = "Your bid must be bigger than the start price and the last bid.";
        } else {
            placeBid(newBidAmount);
            newBidAmount = null;
        }
    }

    async function placeBid(newBidAmount) {
        let newBid = { bagId: bagId, bidderId: userId, bidAmount: newBidAmount };

        try {
            const response = await fetch(`http://localhost:3000/bags/${bagId}/bids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(newBid)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Bid placed successfully:', data);
                currentPrice.set(newBidAmount);
                bids = [];
                await fetchBids();
                dispatch('newBid', newBidAmount);
            } else {
                const errorData = await response.json();
                console.error('Failed to place bid:', errorData);
            }
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    }

    async function fetchBids() {
        try {
            const response = await fetch(`http://localhost:3000/bags/${bagId}/bids`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                errorMessage = errorData.error;
            }

            bids = await response.json();
            if (bids.length > 0) {
                lastBidAmount = bids[bids.length - 1].bidAmount;
            }
        } catch (error) {
            console.log("error: " + error);
        }
    }
</script>

<div id="bidSection">
    {#each bids as bid}
        <div class="bid-item">
            <span class="bid-username">{bid.bidderUsername}</span>
            <span class="bid-amount">€{bid.bidAmount}</span>
        </div>
    {/each}
    {#if AuctionEnded}
        <p class="errorMessage">The auction has ended. You can no longer place a bid.</p>
    {:else}
        <input type="number" bind:value={newBidAmount} />
        <button on:click={handleBidClick}>Place Bid</button>
    {/if}
    {#if errorMessage}
        <p class="errorMessage">{errorMessage}</p>
    {/if}
</div>

<style>
    #bidSection {
        margin: 2rem 0 2rem;
        padding: 1rem;
        background-color: #f9f9f9;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }


    .bid-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
    }

    .bid-username {
        font-weight: bold;
        color: #333;
    }

    .bid-amount {
        color: #007BFF;
    }

    input {
        margin-top: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        width: calc(100% - 140px);
    }

    button {
        padding: 0.6rem 1.5rem;
        font-size: 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    p {
        margin-top: 0.5rem;
        font-size: 1.1rem;
        color: #333;
    }

    .errorMessage {
        color: #e74c3c;
        font-weight: bold;
        font-size: 1rem;
        margin-top: 1rem;
    }

</style>
