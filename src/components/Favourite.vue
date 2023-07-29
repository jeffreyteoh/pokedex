<template>
    <button class="top-0 right-0 p-2 h-5 float-right" @click="toggleFavourite">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :style="{ fill: fillStyle }" viewBox="0 0 512 512">
            <path
                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
    </button>
</template>
  
<script>
export default {
    name: "FavouriteButton",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        return {
            isFavourite: favorites.includes(this.id),
        }
    },
    computed: {
        fillStyle() {
            return this.isFavourite ? "#EF4444" : "#F1F5F9";
        }
    },
    created() {
        this.emitter.on('update-favourite', this.updateFavourite);
    },
    beforeDestroy() {
        this.emitter.$off('update-favourite', this.updateFavourite);
    },
    methods: {
        toggleFavourite() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (favorites.includes(this.id)) {
                const index = favorites.indexOf(this.id);
                if (index !== -1) {
                    favorites.splice(index, 1);
                }
                this.isFavourite = false;
            } else {
                favorites.push(this.id);
                this.isFavourite = true;
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));

            this.emitter.emit('update-favourite', {'id': this.id, 'isFavourite': this.isFavourite});
        },
        updateFavourite(event) {
            if (this.id === event.id) {
                this.isFavourite = event.isFavourite;
            }
        }
    }
};
</script>