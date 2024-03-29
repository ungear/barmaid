<template>
  <div class="drink-details" v-if='currentDrinkLoadingStage === drinkLoadingStages.success'>
    <div class='drink-details__header'>
      <h2 class='drink-details__name'>{{drinkData.name}}</h2>
      <drink-alc-type-icon class='drink-details__type-icon' :alcType='drinkData.alcType'></drink-alc-type-icon>
      <favorite-mark :drinkId="drinkId"></favorite-mark>
    </div>
    <div class="drink-details__image">
      <img :src="drinkThumbSrc" width='200' height='200' >
    </div>
    <div class='section'>
      <h3>Ingredients</h3>
      <div class='ingredients-thumbs'>
        <img v-for='(dIng, key) in drinkData.ingredients' 
          class='ingredients-thumbs__thumb' 
          :src='"https://www.thecocktaildb.com/images/ingredients/" + dIng.name + "-Small.png"'
          :alt='dIng.name'
          :title='dIng.name'
          :key='key'/>
      </div>
      <ul class='ingredients-list'>
        <li class='ingredients-list__item' v-for='(ing, ingKey) in drinkData.ingredients' :key="ingKey">
          <span
            class='ingredients-list__ingredient-name' 
            :class="{ 'ingredients-list__ingredient-name--active': ing.description}"
            @click='ing.description && onIngredientNameClick(ing.name)'>{{ing.name}}</span>
          <span v-if="ing.measure"> - {{ing.measure}}</span>
          <transition name="fade">
            <p
              class='ingredients-list__ingredient-description' 
              v-if='ingredientsDescriptionsToShow.includes(ing.name)'>{{ing.description}}</p>
          </transition>
        </li>
      </ul>
    </div>
    <div class='section'>
      <h3>Glass</h3>
      <p>{{drinkData.glass}}</p>
    </div>
    <div class='section'>
      <h3>Instructions</h3>
      <p>{{drinkData.instructions}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FavoriteMark from "./favorite-mark.vue";
import DrinkAlcTypeIcon from "./drinkAlcTypeIcon.vue";
import { GET_INGREDIENTS_STAGES } from "../consts/consts";

const drinkLoadingStages = {
  inProgress: 1,
  success: 2,
  failed: 3
};

export default {
  name: "drink",
  components: {
    FavoriteMark,
    DrinkAlcTypeIcon
  },
  data() {
    return {
      currentDrinkLoadingStage: null,
      ingredientsDescriptionsToShow: []
    };
  },
  computed: mapState({
    isIngredientsLoaded: state => state.ingredients.gettingIngredientsStatus === GET_INGREDIENTS_STAGES.dataReceived,
    drinkData(state) {
      const drink = state.drinks.fullData[this.drinkId];
      if(this.isIngredientsLoaded){
        drink.ingredients.forEach(x => {
          x.name = state.ingredients.ingredientsList.find(i => i._id === x.ingId)?.ingredientName;
        })
      }
      return state.drinks.fullData[this.drinkId];
    },
    drinkThumbSrc() {
      return this.drinkData.thumbImageUrl.indexOf("https://") === 0
        ? this.drinkData.thumbImageUrl
        : "https://" + this.drinkData.thumbImageUrl;
    },
    drinkId() {
      return this.$route.params.link.split("-")[0];
    }
  }),
  created() {
    this.$store.dispatch("getAllIngredients");
    this.drinkLoadingStages = drinkLoadingStages;
    this.currentDrinkLoadingStage = drinkLoadingStages.inProgress;
    this.$store.dispatch("loadDrinkFullData", this.drinkId).then(() => {
      this.currentDrinkLoadingStage = drinkLoadingStages.success;
    });
  },
  methods: {
    onIngredientNameClick(name) {
      let index = this.ingredientsDescriptionsToShow.indexOf(name);
      if (index >= 0) this.ingredientsDescriptionsToShow.splice(index, 1);
      else this.ingredientsDescriptionsToShow.push(name);
    }
  }
};
</script>

<style lang="scss" scoped>
.drink-details {
  &__header {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }
  &__type-icon {
    width: 20px;
    height: 20px;
    margin: 0 0 0 10px;
  }
  &__image{
    width: 200px;
    height: 200px;
    background-image: url('../assets/glass_bw_100.png');
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ccc;
  }
  .section {
    padding: 5px 0;
  }
  .ingredients-thumbs {
    padding: 10px 0;
  }
  .ingredients-list {
    margin-left: 20px;
    .ingredients-list__item {
      margin: 5px 0;
    }
    .ingredients-list__ingredient-name {
      &--active {
        border-bottom: 1px dotted #222;
        cursor: pointer;
      }
    }
    .ingredients-list__ingredient-description {
      padding: 10px;
      background: #eee;
      border: 1px solid #333;
      border-radius: 5px;
      margin: 5px 0;
    }
  }
}
</style>
