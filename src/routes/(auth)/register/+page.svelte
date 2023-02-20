<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    console.log(data.session)
</script>

<div>
    {#if data.session}
        <p>Welcome {data.session.user.email}</p>
    {:else}
        <form class="form-box" action="/register" method="POST">
            <h1 class="form-header">Sign up</h1>
            <label class="form-group">
                <div class="form-label">Email</div>
                <input class="form-input" type="text" name="email" placeholder="Email">
            </label>
            <label class="form-group">
                <div class="form-label">Password</div>
                <input class="form-input" type="password" name="password" placeholder="Password">
            </label>
            <label class="form-group">
                <div class="form-label">Confirm Password</div>
                <input class="form-input" type="password" name="password2" placeholder="Re- enter password">
            </label>
            <div class="form-buttons">
                <button class="button-fill primary">
                    Sign Up
                </button>
            </div>
            <div class="redirect-option">Already have an account? 
                <a href="/login">
                    Login
                </a>
            </div>
        </form>
    {/if}

</div>
