<script lang="ts">
    import googleIcon from '$lib/assets/icon-google.svg'
    import type { ActionData } from './$types';

    export let form: ActionData
</script>

<div>
    <div class="form-box">
        <h1 class="form-header">Login</h1>
        <form class="oauth-login" method="POST">
            <input type="hidden" value="ngetes">
            <button class="button-outline oauth-button" formaction="/login?provider=google" type="submit">
                <img src={googleIcon} alt="google-login" width="20">
                <span>Sign in with google</span>
            </button>
        </form>
        <form class="email-login" action="/login" method="POST">
            <label class="form-group">
                <div class="form-label">Email</div>
                <input class="form-input" type="text" name="email" placeholder="Email" autocomplete="username">
            </label>
            <label class="form-group">
                <div class="form-label">Password</div>
                <input class="form-input" type="password" name="password" placeholder="Password" autocomplete="current-password">
            </label>
            {#if form?.error}
                 <div class="error-box">
                    {form?.error}
                 </div>
            {/if}
            <div class="form-buttons">
                <button class="button-fill primary" type="submit">
                    Login
                </button>
            </div>
            <div class="redirect-option">Dont have an account? 
                <a href="/register">
                    Sign Up
                </a>
            </div>
        </form>
    </div>
</div>

<style lang="scss">
    .oauth-login {
        width: 100%;
        border-bottom: 2px solid var(--gray-bg);
        padding-bottom: 1em;

        button {
            box-shadow: none;
            width: 100%;
            padding: 0.7em 0;
        }
    }

    .oauth-button {
        border: 2px solid #f1f1f1;
        color: var(--gray-light);
        font-weight: normal;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 1em;
    }
</style>

