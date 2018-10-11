<template>
  <div class='drinks-list'>
    <div class='dashboard'>
      <div class='dashboard__section'>
        Sort by 
        <select 
          v-model='sortBy'>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
      </div>
      <div class='dashboard__section dashboard-filters'>
        <span class='dashboard-filters__label'>Filters</span>
        <drink-alc-type-icon 
          class='dashboard-filters__type-icon'
          :class="{ 'dashboard-filters__type-icon--inactive': hiddenTypes.includes(x)}"
          @click.native='onTypeFilterClick(x)'
          v-for='x in drinksAlcTypes'
          :key='x'
          :alcType='x'
          :title="hiddenTypes.includes(x) ? 'Show ' + x : 'Hide ' + x "></drink-alc-type-icon>
      </div>
    </div>
    <drink-snippet 
      class='drinks-list__item'
      :class="{'drinks-list__item--hidden': hiddenTypes.includes(x.alcType)}" 
      :drink="x" 
      v-for="x in processedDrinksData" 
      v-bind:key="x.idDrink"></drink-snippet>
  </div>
</template>

<script>
import DrinkSnippet from "./drinkSnippet.vue";
import { mapState } from "vuex";
import DrinkAlcTypeIcon from "./drinkAlcTypeIcon.vue";

export default {
  name: "drinks-list",
  components: { DrinkSnippet, DrinkAlcTypeIcon },
  props: {
    drinks: Array
  },
  data: function() {
    return {
      sortBy: "name",
      hiddenTypes: []
    };
  },
  computed: mapState({
    processedDrinksData() {
      return this.sortBy === "name"
        ? this.drinks.slice().sort(sortDrinksByName)
        : this.drinks.slice().sort(sortDrinksByTypeThenName);
    },
    drinksAlcTypes() {
      return this.drinks
        .reduce((uniqueArray, drink) => {
          if (!uniqueArray.includes(drink.alcType))
            uniqueArray.push(drink.alcType);
          return uniqueArray;
        }, [])
        .sort();
    }
  }),
  created() {},
  methods: {
    onTypeFilterClick(type) {
      //toggle hidden types
      let index = this.hiddenTypes.indexOf(type);
      if (index >= 0) this.hiddenTypes.splice(index, 1);
      else this.hiddenTypes.push(type);
    }
  }
};

function sortDrinksByName(a, b) {
  if (a.name < b.name) return -1;
  else if (a.name > b.name) return 1;
  else return 0;
}

function sortDrinksByTypeThenName(a, b) {
  if (a.alcType < b.alcType) return -1;
  else if (a.alcType > b.alcType) return 1;
  else return sortDrinksByName(a, b);
}
</script>

<style lang="scss" scoped>
.drinks-list {
  &__item {
    display: flex;
  }
  &__item + &__item {
    padding-top: 1em;
    border-top: 1px solid #ccc;
    margin-top: 1em;
  }
  .drinks-list__item--hidden {
    display: none;
  }
  .dashboard {
    display: flex;
    margin-bottom: 1em;
    .dashboard__section + .dashboard__section {
      margin-left: 2em;
    }
    .dashboard-filters {
      display: flex;
      height: 20px;
      .dashboard-filters__label {
        margin-right: 0.5em;
      }
      .dashboard-filters__type-icon {
        width: 20px;
        cursor: pointer;
        user-select: none;
        &--inactive {
          filter: grayscale(100%) opacity(25%);
        }
      }
      .dashboard-filters__type-icon + .dashboard-filters__type-icon {
        margin-left: 0.5em;
      }
    }
  }
}
</style>
