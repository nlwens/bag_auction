<script>
    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let errorMessage = '';

    const handleRegister = async () => {
        errorMessage = '';

        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match!";
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password}),
            });

            if (response.ok) {
                //this is to make the user automatically logged in after registration
                const loginResponse = await fetch('http://localhost:3000/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (loginResponse.ok) {
                    const data = await loginResponse.json();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', username);
                    localStorage.setItem('isAdmin', data.isAdmin)
                    localStorage.setItem('userId', data.userId)
                    window.location.href = localStorage.getItem('beforeLoginUrl');
                } else {
                    errorMessage = 'Login failed after registration. Please try to log in manually.';
                }
            } else {
                errorMessage = 'Username already exists, please try another.';
            }
        } catch (error) {
            console.error('Network error:', error);
            errorMessage = 'An error occurred. Please try again later.';
        }
    }

</script>

<div class="container">
    <form on:submit|preventDefault={handleRegister}>
        <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" id="username" bind:value={username} required />
        </div>
        <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required />
        </div>
        <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        <div class="input-group">
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" bind:value={confirmPassword} required />
        </div>
        {#if errorMessage}
            <p class="error-message" style="color: red;">{errorMessage}</p>
        {/if}
        <button type="submit">Register</button>
    </form>
</div>

<style>
    .container {
        padding: 2rem;
        margin: 2rem 5rem;
        width: 30rem;
        left: 20px;
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
        margin-top: 1rem;
    }

    button:hover {
        background-color: #333;
    }
</style>
