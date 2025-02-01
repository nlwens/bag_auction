<script>
    export let label = '';
    export let options = [];
    export let selectedValue = '';
    export let onSelect;

    function handleChange(event) {
        onSelect(event.target.value);
    }
</script>

<label>{label}</label>
<select on:change={handleChange} bind:value={selectedValue}>
    <option value="">All {label}s</option>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>

<style>
    label {
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        font-weight: 500;
        color: black;
        margin-bottom: 8px;
        text-align: left;
        width: 100%;
    }

    select {
        padding: 10px;
        width: 90%;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 14px;
        border: 1px solid grey;
        border-radius: 5px;
        background-color: white;
        color: black;
        outline: none;
        margin-bottom: 1rem;
    }

</style>
