<script>
    import { createEventDispatcher } from 'svelte';
    export let updateData = {};
    export let showUpload;
    export let method = 'POST'

    let name = updateData.name || '';
    let brand = updateData.brand || '';
    let country = updateData.country || '';
    let color = updateData.color || '';
    let endDate = updateData.endDate || '';
    let startPrice = updateData.startPrice || '';
    let size = updateData.size || '';
    let src = updateData.src || '';
    let token = localStorage.getItem('token') || '';

    let isUploading = false;
    let uploadSuccess = false;
    let uploadError = '';
    let errorMsg= null;

    const dispatch = createEventDispatcher();

    // 关闭上传表单
    function closeModal() {
        showUpload = false;
        resetForm();
        dispatch('close');
    }

    // 提交上传
    async function submitForm() {
        isUploading = true;
        uploadError = '';
        uploadSuccess = false;

        const newItem = {
            name,
            brand,
            country,
            color,
            endDate: new Date(endDate).toISOString(),
            startPrice,
            size,
            src
        };

        try {
            const url = (method === 'POST') ? 'http://localhost:3000/bags' : `http://localhost:3000/bags/${updateData.bagId}`;

            console.log(updateData);
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(newItem)
            });

            if (response.ok) {
                uploadSuccess = true;
                showUpload = false;
                location.reload()
            } else {
                const errorData = await response.json();
                errorMsg = errorData.error;
            }
        } catch (error) {
            uploadError = 'An error occurred while uploading!';
        } finally {
            isUploading = false;
        }
    }

    function resetForm() {
        name = '';
        brand = '';
        country = '';
        color = '';
        endDate = '';
        startPrice = '';
        size = '';
        src = '';
    }

    export function fillForm(uploadData) {
        name = uploadData.name;
        brand = uploadData.brand;
        country = uploadData.country;
        color = uploadData.color;
        endDate = uploadData.endDate;
        startPrice = uploadData.startPrice;
        size = uploadData.size;
        src = uploadData.src;
    }
</script>

{#if showUpload}
    <div class="modal-overlay" on:click={closeModal}></div>
    <div class="modal">
        <h2>Upload New Bag</h2>
        <form on:submit|preventDefault={submitForm}>
            <div class="form-group">
                <p>Bag Name:</p>
                <input type="text" bind:value={name} required />
            </div>
            <div class="form-group">
                <p>Brand:</p>
                <input type="text" bind:value={brand} required />
            </div>
            <div class="form-group">
                <p>Country of Origin:</p>
                <input type="text" bind:value={country} required />
            </div>
            <div class="form-group">
                <p>Color:</p>
                <input type="text" bind:value={color} required />
            </div>
            <div class="form-group">
                <p>End Date:</p>
                <input type="datetime-local" bind:value={endDate} required />
            </div>
            <div class="form-group">
                <p>Starting Price:</p>
                <input type="number" bind:value={startPrice} required />
            </div>
            <div class="form-group">
                <p>Size (e.g. SMALL, MEDIUM, LARGE):</p>
                <input type="text" bind:value={size} required />
            </div>
            <div class="form-group">
                <p>Image URL:</p>
                <input type="text" bind:value={src} required />
            </div>

            <div class="button-group">
                <button type="submit">Submit</button>
                <button type="button" on:click={closeModal}>Cancel</button>
            </div>
        </form>
        {#if errorMsg}
            <p class="backend-error-text">{errorMsg}</p>
        {/if}
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 20;
        width: 400px;
        height: 600px;
        max-width: 90%;
        display: block;
        visibility: visible;
    }

    h2 {
        color: black;
        margin-bottom: 1rem;
        text-align: center;
    }

    .form-group p {
        margin-bottom: 0.5rem;
        font-size: 14px;
        color: black;
        text-align: left;
    }

    form {
        display: grid;
        gap: 1rem;
    }

    .form-group input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    button {
        padding: 0.75rem;
        font-size: 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>