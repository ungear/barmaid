<template>
  <div class='drink-snippet'>
    <div class='drink-snippet__thumb'>
      <img class='drink-snippet__thumb-image' :src="drinkThumbSrc" alt="">
    </div>
    <div class='drink-snippet__info'>
      <div class='drink-snippet__row'>
        <router-link class='drink-snippet__name' :to='{name: "drink", params: {link: drinkLinkString}}'>{{drink.name}}</router-link>
        <favorite-mark :drinkId="drink._id"></favorite-mark>
      </div>
      <div class='drink-snippet__row'>
        <drink-alc-type-icon class='drink-snippet__type-icon' :alcType='drink.alcType'></drink-alc-type-icon>
        <div class='drink-snippet__ingredients'>
          <div class="ingredients-list">
            <span v-for='(name, key) in drinkIngredientNames' 
              class='ingredients-list__tag'
              :key='key'>{{name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FavoriteMark from "./favorite-mark.vue";
import Spinner from "./spinner.vue";
import DrinkAlcTypeIcon from "./drinkAlcTypeIcon.vue";

export default {
  name: "drink-snippet",
  components: { FavoriteMark, Spinner, DrinkAlcTypeIcon },
  props: {
    drink: Object
  },
  computed: mapState({
    ingredientsList: state => state.ingredients.ingredientsList,
    drinkLinkString() {
      return [
        this.drink._id,
        this.drink.name.toLowerCase().replace(/\s/g, "-")
      ].join("-");
    },
    drinkThumbSrc() {
      return this.drink.thumbImageUrl.indexOf("https://") === 0
        ? this.drink.thumbImageUrl
        : "https://" + this.drink.thumbImageUrl;
    },
    drinkIngredientNames() {
      return this.drink.ingredients.map(
        x => this.ingredientsList.find(t => t._id === x.ingId).ingredientName
      ).sort();
    }
  }),
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../colorScheme.scss";
@import "../functions.scss";

$tagColor: #555;
.drink-snippet {
  display: flex;
  .drink-snippet__thumb {
    width: 100px;
    height: 100px;
    flex: 0 0 auto;
    background: #ccc;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .drink-snippet__thumb-image {
      width: 100px;
      height: 100px;
      transition: width 0.5s, height 0.5s;
      &:hover {
        width: 120px;
        height: 120px;
      }
    }
  }
  .drink-snippet__info {
    display: flex;
    flex-direction: column;
    margin-left: 1em;
    width: 100%;
    .drink-snippet__row {
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
    }
  }
  .drink-snippet__spinner {
    transform: scale(0.5);
  }
  .drink-snippet__name {
    text-decoration: none;
    color: #000;
    font-weight: 700;
    font-size: 1.3em;
    &:hover {
      color: $blueMunsell;
    }
  }
  .drink-snippet__type-icon {
    width: 30px;
    height: 30px;
    flex: 0 0 auto;
  }
  .drink-snippet__ingredients {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    margin-left: 10px;
    width: 100%;
  }
  .ingredients-list {
    .ingredients-list__tag {
      display: inline-block;
      border: 1px solid $tagColor;
      border-radius: 5px;
      background: #eee;
      padding: 0px 7px;
      margin: 5px 10px 0 0;
      color: $tagColor;
    }
  }
}
</style>


