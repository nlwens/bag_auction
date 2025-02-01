<script>
    export let endDate;
    import { auctionEnded } from '../../WritableStore';

    let remainingTime = "";

    function calculateRemainingTime() {
        const end = new Date(endDate);
        const now = new Date();
        const timeDiff = end - now;

        if (timeDiff <= 0) {
            remainingTime = "Auction ended";
            auctionEnded.set(true);
        } else {
            auctionEnded.set(false);
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            remainingTime = `Ending at: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }

    const intervalId = setInterval(() => {
        calculateRemainingTime();
    }, 1000);

    import { onDestroy } from "svelte";
    onDestroy(() => {
        clearInterval(intervalId);
    });

    calculateRemainingTime();
</script>

<p>{remainingTime}</p>

<style>
    p {
        font-weight: bold;
        font-size: 16px;
    }
</style>
