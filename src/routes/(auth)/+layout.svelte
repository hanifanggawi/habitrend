<script lang="ts">
    import '../../app.scss';
    import './auth.scss'
</script>

<div class="page-container">
    <slot />
</div>

<style>
    .page-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
        background: var(--gray-bg);
    }
</style>