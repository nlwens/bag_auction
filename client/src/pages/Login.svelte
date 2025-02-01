<script>
    let username = '';
    let password = '';
    let errorMessage = '';

    const handleLogin = async () => {
        errorMessage = '';

        try {
            const response = await fetch('http://localhost:3000/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                localStorage.setItem('isAdmin', data.isAdmin)
                localStorage.setItem('userId', data.userId)
                window.location.href = localStorage.getItem('beforeLoginUrl');
            } else {
                console.log(response);
                errorMessage = 'Invalid username or password.';
            }
        } catch (error) {
            errorMessage = 'An error occurred. Please try again later.';
        }
    };
</script>

<div class="container">
    <h1>Login</h1>
    <form on:submit|preventDefault={handleLogin}>
        <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" id="username" bind:value={username} />
        </div>
        <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} />
        </div>
        {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
        {/if}
        <button type="submit">Login</button>
        <p>
            Don't have an account?
            <span class="register-link" on:click={() => window.location.href='/register'}>
                Register here
            </span>
        </p>
    </form>
</div>

<style>

    .container {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 25rem;
        text-align: center;
    }

    h1 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
    }

    .input-group {
        margin-bottom: 15px;
        text-align: left;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #555;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.3s;
    }

    input:focus {
        border-color: #000;
        outline: none;
    }

    button {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        background-color: black;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin: 1rem 0 2rem;
    }

    button:hover {
        background-color: #333;
    }

    .register-link {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
        margin-top: 10px;
    }

    .register-link:hover {
        color: darkblue;
    }
</style>
