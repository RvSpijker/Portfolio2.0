<template>
  <header>
    <a href="#" @click.prevent="$emit('navigate', 'home')">
      <h1 class="headertext"><strong>RVSPIJKER</strong></h1>
    </a>
  </header>
  <nav>
    <div class="nav-flex">
      <a href="#" @click.prevent="$emit('navigate', 'home')"><h2 class="navlink">Home</h2></a>
      <a href="#" @click.prevent="$emit('navigate', 'curriculum')"
        ><h2 class="navlink1">Curriculum Vitae</h2></a
      >
      <a href="#" @click.prevent="$emit('navigate', 'cv')"><h2 class="navlink2">CV</h2></a>
      <a href="#" @click.prevent="$emit('navigate', 'projecten')"
        ><h2 class="navlink">Projecten</h2></a
      >
      <a href="#" @click.prevent="$emit('navigate', 'contact')"
        ><h2 class="navlink navlink4">Contact</h2></a
      >
    </div>
  </nav>
</template>
