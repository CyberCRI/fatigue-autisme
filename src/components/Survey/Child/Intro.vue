<template>
  <v-card class="pa-md-4 mb-4">
    <h2>Important :</h2>
    <p>
      Ce questionnaire a pour principal objectif de recueillir votre témoignage
      et votre perception de la fatigue mentale : il n’y a donc pas de bonnes ou
      de mauvaises réponses.
    </p>
    <p>
      Lorsque la réponse est une zone de texte libre, sentez-vous libre de
      préciser tout ce que vous souhaitez, et ce qui vous semble important. Ne
      vous inquiétez pas pour la qualité de la rédaction ou l’orthographe !
    </p>
    <p>
      Compléter ce questionnaire prend
      <span class="blue--text"
        >en moyenne de 20 à 30 minutes. N’hésitez pas à faire une pause, ou à y
        répondre en plusieurs fois si le souhaitez.</span
      >
      Pour cela, il vous suffit de cliquer sur « Enregistrer mes réponses » au
      bas de la page sur laquelle vous vous trouvez. Vos réponses seront
      enregistrées et vous pourrez reprendre là où vous vous étiez arrêté la
      prochaine fois que vous vous connecterez sur le site.
    </p>
    <v-row justify="center">
      <v-btn
        class="btn primary bouton ma-4"
        @click="$router.push('/enfants/questionnaire/partA')"
      >
        Commencer le questionnaire
      </v-btn>
    </v-row>
  </v-card>
</template>
