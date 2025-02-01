<script>
    import Upload from "../components/Upload.svelte";
    let username = localStorage.getItem('username') || '';
    let isAdmin = localStorage.getItem('isAdmin') || '';
    let userId = localStorage.getItem('userId') || '';
    let showUpload = false;

    function goToLogin() {
        const currentUrl = window.location.href;
        localStorage.setItem('beforeLoginUrl', currentUrl);
        window.location.href = '/login';
    }

    // 登出功能
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
        username = '';
        const currentUrl = window.location.href;
        localStorage.setItem('beforeLoginUrl', currentUrl);
        window.location.href = '/login';
    }

    function openUpload() {
        showUpload = true;
    }

    function goToDashboard(){
        window.location.href = `/dashboard?userId=${userId}`;
    }

</script>
<nav>
    <a href="/" style="text-decoration: none; color: white;">
        <div id="logo-container">
            <h1>SACS D'ANGES</h1>
            <p>ENCHANT YOUR DREAM</p>
        </div>
    </a>
    <div id="login-div">
        {#if username !== ''}
            <span class="login-text">{username}</span>
            {#if isAdmin === "true"}
                <span>|</span>
                <span class="login-text" on:click={openUpload}>Upload New Item</span>
            {:else}
                <span>|</span>
                <span class="login-text" on:click={goToDashboard}>My Home</span>
            {/if}

            <span>|</span>
            <span class="login-text" on:click={logout}>Logout</span>
        {:else}
            <span class="login-text" on:click={goToLogin}>Login</span>
        {/if}
    </div>
    {#if showUpload}
        <Upload {showUpload} on:close={() => showUpload = false} />
    {/if}
</nav>

<style>
    nav {
        display: grid;
        grid-template-columns: 1fr auto;
        padding: 20px;
        background-color: black;
        text-align: center;
        color: white;
        justify-items: start;
        margin-bottom: 2rem;
    }

    #logo-container {
        display: flex;
        flex-direction: column;
        text-align: left
    }

    #login-div {
        display: flex;
        align-items: center;
        padding: 0 20px;
        gap: 1rem;
    }

    .login-text {
        cursor: pointer;
    }

    .login-text:hover {
        color: grey;
    }
</style>
