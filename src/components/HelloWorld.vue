<template>
  <div>
    <div>
      <P>
        <h2>
          <b-link style=" text-decoration: none"
            target="_blank"
            class="font-weight-bold"
            href="https://lichess.org/team/vjya9K6q"
          >
            <span> باشگاه ستارگان </span>
          </b-link>
        </h2>
      </P>
    </div>
    <b-table
      striped
      responsive 
      hover
      :busy.sync="isBusy"
      :items="Values"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear=""
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(flag)="data">
        <country-flag
          v-if="data.item.url !== ''"
          :country="data.item.country"
          size="small"
        />
      </template>

      <template #cell(username)="data">
        <b-icon
          icon="circle"
          v-if="!data.item.online"
        ></b-icon>

       <b-icon  v-if="data.item.online"
          icon="circle-fill"
          variant="success"
        ></b-icon>

        <b-link target="_blank" :href="data.item.url">
       <span class="">
         {{ data.item.username }}
         </span>   
        </b-link>
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

        <span
          v-if="data.item.classical_prog != 0"
          class="small"
          v-bind:style="[
            data.item.classical_prog > 0
              ? { color: '#198754' }
              : { color: '#dc3545' },
          ]"
        >
          {{ data.item.classical_prog }}</span
        >
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

        <span
          v-if="data.item.rapid_prog != 0"
          class="small"
          v-bind:style="[
            data.item.rapid_prog > 0
              ? { color: '#198754' }
              : { color: '#dc3545' },
          ]"
        >
          {{ data.item.rapid_prog }}</span
        >
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

        <span
          v-if="data.item.blitz_prog != 0"
          class="small"
          v-bind:style="[
            data.item.blitz_prog > 0
              ? { color: '#198754' }
              : { color: '#dc3545' },
          ]"
        >
          {{ data.item.blitz_prog }}</span
        >
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

        <span
          v-if="data.item.bullet_prog != 0"
          class="small"
          v-bind:style="[
            data.item.bullet_prog > 0
              ? { color: '#198754' }
              : { color: '#dc3545' },
          ]"
        >
          {{ data.item.bullet_prog }}</span
        >
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
      isBusy: true,
      users: [
        "rashvand",
        "mahdi5076",
        "Tavakolian3003",
        "setareganchess",
        "MREZA20",
        "pishevar",
        "RebelJohnny",
      ],
      Values: [],
      sortBy: "classical_rating",
      sortDesc: true,
      fields: [
        {
          key: "index",
          label: "#",
        },
        {
          key: "flag",
          label: "",
        },
        {
          key: "username",
          label: "Player",
          sortable: false,
        },
        {
          key: "classical_rating",
          label: "Classical",
          sortable: true,
        },
        {
          key: "rapid_rating",
          label: "Rapid",
          sortable: true,
        },
        {
          key: "blitz_rating",
          label: "Blitz",
          sortable: true,
        },
        {
          key: "bullet_rating",
          label: "Bullet",
          sortable: false,
        },
      ],
    };
  },
  computed: {},
  destroyed() {},
  mounted() {
    this.apiCall();
  },
  created() {},
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
          this.isBusy = false;
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
