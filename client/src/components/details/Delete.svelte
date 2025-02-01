<script>
    export let bagId
    const token = localStorage.getItem("token");
    let errorMsg = null;

    async function deleteBag() {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await fetch(`http://localhost:3000/bags/${bagId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (response.ok) {
                    alert("Item deleted successfully!");
                    window.location.href = '/';
                } else {
                    const errorData = await response.json();
                    errorMsg = errorData.error;
                }
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("An error occurred while deleting the item.");
            }
        }
    }
</script>

<span class="delete-text" on:click={deleteBag}>delete this item</span>
{#if errorMsg}
    <p class="backend-error-text">{errorMsg}</p>
{/if}

<style>
    .delete-text {
        cursor: pointer;
        text-decoration: underline;
    }
</style>