<template>
  <section>
    <v-row justify="center">
      <v-col cols="11" sm="10">
        <p>Cher lycéen, chère lycéenne,</p>
        <p>
          Vous avez accepté de participer à cette étude en complétant ce
          questionnaire sur la fatigabilité mentale et nous vous en remercions
          beaucoup. Votre contribution est très importante, car elle permettra
          de mieux comprendre ce qui caractérise la fatigue mentale chez les
          adolescents et jeunes adultes sur le spectre de l’autisme, et de
          mettre au point des outils permettant de la gérer au mieux et de la
          prévenir.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="11" sm="10">
        <v-container mb-8>
          <v-row justify="center">
            <v-card color="blue lighten-5" class="py-6 px-6">
              <p>
                Quelques mots sur <strong :class="this.$store.state.settings.accentTextClass">la fatigue mentale</strong>:</p>
                <p>
                <!-- Avant de démarrer, voici quelques explications sur ce que nous
                appelons la <strong :class="this.$store.state.settings.accentTextClass">fatigue mentale</strong>.  -->
                <strong :class="this.$store.state.settings.accentTextClass">La fatigue mentale</strong> (aussi appelée
                fatigue cognitive, ou fatigabilité mentale) est relativement peu
                étudiée en recherche et en médecine. Or, nous savons qu’elle
                peut avoir des répercussions importantes sur le quotidien des
                personnes, tant au niveau personnel que scolaire, professionnel
                ou social.
              </p>
              <p>
                Elle peut être définie comme une diminution progressive des
                ressources cognitives lors de tâches cognitives soutenues, et ce
                indépendamment du fait d’avoir sommeil. Elle peut s’observer
                dans des contextes variés, où l’attention et les fonctions
                exécutives (planification, anticipation, mémoire de travail,
                etc.) sont sollicitées. Les personnes peuvent par exemple avoir
                davantage de difficultés pour planifier une tâche, traiter
                l’information ou faire abstraction d’informations non
                pertinentes.
              </p>
            </v-card>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </section>
</template>
