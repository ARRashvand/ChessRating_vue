<template>
  <div>
    <b-table
      striped
      hover
      sticky-header
      :items="Values"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear=""
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template #cell(username)="data">
        {{ data.item.username }}
      </template>

      <template #cell(classical_rating)="data">
        {{ data.item.classical_rating }}

        <b-icon
          v-if="data.item.classical_prog > 0"
          icon="arrow-up"
          variant="success"
          rotate="45"
        ></b-icon>
        <b-icon
          v-if="data.item.classical_prog < 0"
          icon="arrow-down"
          variant="danger"
          rotate="-45"
        ></b-icon>
      </template>

      <template #cell(rapid_rating)="data">
        {{ data.item.rapid_rating }}

        <b-icon
          v-if="data.item.rapid_prog > 0"
          icon="arrow-up"
          variant="success"
          rotate="45"
        ></b-icon>
        <b-icon
          v-if="data.item.rapid_prog < 0"
          icon="arrow-down"
          variant="danger"
          rotate="-45"
        ></b-icon>

      </template>
      <template #cell(blitz_rating)="data">
        {{ data.item.blitz_rating }}

        <b-icon
          v-if="data.item.blitz_prog > 0"
          icon="arrow-up"
          variant="success"
          rotate="45"
        ></b-icon>
        <b-icon
          v-if="data.item.blitz_prog < 0"
          icon="arrow-down"
          variant="danger"
          rotate="-45"
        ></b-icon>

      </template>
      <template #cell(bullet_rating)="data">
        {{ data.item.bullet_rating }}

        <b-icon
          v-if="data.item.bullet_prog > 0"
          icon="arrow-up"
          variant="success"
          rotate="45"
        ></b-icon>
        <b-icon
          v-if="data.item.bullet_prog < 0"
          icon="arrow-down"
          variant="danger"
          rotate="-45"
        ></b-icon>
      </template>
    </b-table>
  </div>
</template>

  

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      users: ["rashvand", "HamidrezaBagheri", "mrseif"],
      Values: [],
      sortBy: "classical_rating",
      sortDesc: true,
      fields: [
        {
          key: "username",
          label: "username",
        },
        {
          key: "classical_rating",
          label: "classical",
          sortable: true,
        },
        {
          key: "rapid_rating",
          label: "rapid",
          sortable: true,
        },
        {
          key: "blitz_rating",
          label: "blitz",
          sortable: true,
        },
        {
          key: "bullet_rating",
          label: "bullet",
          sortable: false,
        },
      ],
    };
  },

  created() {
    this.apiCall();
  },
  methods: {
    apiCall() {
      this.users.forEach((item) => {
        const promise = axios({
          method: "get",
          url: `https://lichess.org/api/user/${item}`,
        });
        promise.then((response) => {
          this.Values.push({
            url: response.data.url,
            id: response.data.id,
            username: response.data.username,
            online: response.data.online,
            firstName: response.data.profile.firstName,
            lastName: response.data.profile.lastName,
            country: response.data.profile.country,
            blitz_games: response.data.perfs.blitz.games,
            blitz_rating: response.data.perfs.blitz.rating,
            blitz_rd: response.data.perfs.blitz.rd,
            blitz_prog: response.data.perfs.blitz.prog,

            bullet_games: response.data.perfs.bullet.games,
            bullet_rating: response.data.perfs.bullet.rating,
            bullet_rd: response.data.perfs.bullet.rd,
            bullet_prog: response.data.perfs.bullet.prog,

            classical_games: response.data.perfs.classical.games,
            classical_rating: response.data.perfs.classical.rating,
            classical_rd: response.data.perfs.classical.rd,
            classical_prog: response.data.perfs.classical.prog,

            rapid_games: response.data.perfs.rapid.games,
            rapid_rating: response.data.perfs.rapid.rating,
            rapid_rd: response.data.perfs.rapid.rd,
            rapid_prog: response.data.perfs.rapid.prog,
          });
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
