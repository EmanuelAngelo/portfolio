<template>
  <div class="min-h-screen bg-obsidian text-foreground overflow-x-hidden">
    <HUDNav />
    <LanguageToggleFlag />
    <HeroSectionIndustrial />
    <AboutSectionIndustrial />
    <ExperienceSectionIndustrial />
    <SkillsSectionIndustrial />
    <ImpactSectionIndustrial />
    <ContactSectionIndustrial />
    <FooterIndustrial />
  </div>
</template>
<script setup>
import LanguageToggleFlag from './components/LanguageToggleFlag.vue';

import HUDNav from './components/portfolio/HUDNav.vue';
import HeroSectionIndustrial from './components/portfolio/HeroSectionIndustrial.vue';
import AboutSectionIndustrial from './components/portfolio/AboutSectionIndustrial.vue';
import ExperienceSectionIndustrial from './components/portfolio/ExperienceSectionIndustrial.vue';
import SkillsSectionIndustrial from './components/portfolio/SkillsSectionIndustrial.vue';
import ImpactSectionIndustrial from './components/portfolio/ImpactSectionIndustrial.vue';
import ContactSectionIndustrial from './components/portfolio/ContactSectionIndustrial.vue';
import FooterIndustrial from './components/portfolio/FooterIndustrial.vue';
</script>
