<script setup lang="ts">
/**
 * PediatricDecorations — floating doodles for the pediatric dentistry hero.
 * Cute tooth characters, stars, hearts, clouds, rainbow, balloons,
 * butterflies, and sparkles with gentle bobbing animations.
 */
</script>

<template>
  <div class="ped-floaties">
    <!-- Smiling tooth characters -->
    <svg class="ped ped-tooth ped-tooth-1" viewBox="0 0 60 60" width="50" height="50" aria-hidden="true">
      <ellipse cx="30" cy="32" rx="20" ry="22" fill="#FFE5EC" stroke="#FF9EB5" stroke-width="1.5" />
      <ellipse cx="30" cy="28" rx="14" ry="16" fill="#FFF0F5" />
      <circle cx="23" cy="26" r="2.5" fill="#FF7B89" />
      <circle cx="37" cy="26" r="2.5" fill="#FF7B89" />
      <circle cx="23" cy="26" r="1" fill="#fff" />
      <circle cx="37" cy="26" r="1" fill="#fff" />
      <path d="M22 35 Q30 42 38 35" fill="none" stroke="#FF7B89" stroke-width="1.8" stroke-linecap="round" />
    </svg>
    <svg class="ped ped-tooth ped-tooth-2" viewBox="0 0 60 60" width="36" height="36" aria-hidden="true">
      <ellipse cx="30" cy="32" rx="20" ry="22" fill="#E8F8FF" stroke="#87CEEB" stroke-width="1.5" />
      <ellipse cx="30" cy="28" rx="14" ry="16" fill="#F0F9FF" />
      <circle cx="23" cy="26" r="2.5" fill="#5BA3D9" />
      <circle cx="37" cy="26" r="2.5" fill="#5BA3D9" />
      <circle cx="23" cy="26" r="1" fill="#fff" />
      <circle cx="37" cy="26" r="1" fill="#fff" />
      <path d="M22 35 Q30 42 38 35" fill="none" stroke="#5BA3D9" stroke-width="1.8" stroke-linecap="round" />
    </svg>

    <!-- Stars -->
    <svg class="ped ped-star ped-star-1" viewBox="0 0 30 30" width="22" height="22" aria-hidden="true">
      <path d="M15 2l4 8.5 9.5 1.5-7 6.5 1.5 9L15 21l-8 4.5 1.5-9-7-6.5 9.5-1.5z" fill="#FFE5A3" stroke="#FFD700"
        stroke-width="0.5" />
    </svg>
    <svg class="ped ped-star ped-star-2" viewBox="0 0 30 30" width="16" height="16" aria-hidden="true">
      <path d="M15 2l4 8.5 9.5 1.5-7 6.5 1.5 9L15 21l-8 4.5 1.5-9-7-6.5 9.5-1.5z" fill="#FFE5A3" stroke="#FFD700"
        stroke-width="0.5" />
    </svg>

    <!-- Hearts -->
    <svg class="ped ped-heart ped-heart-1" viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
      <path d="M16 28S4 20 4 12a8 8 0 0 1 12-6 8 8 0 0 1 12 6c0 8-12 16-12 16z" fill="#FF9EB5" stroke="#FF7B89"
        stroke-width="0.8" />
    </svg>
    <svg class="ped ped-heart ped-heart-2" viewBox="0 0 32 32" width="14" height="14" aria-hidden="true">
      <path d="M16 28S4 20 4 12a8 8 0 0 1 12-6 8 8 0 0 1 12 6c0 8-12 16-12 16z" fill="#C3B1E1" stroke="#B39DDB"
        stroke-width="0.8" />
    </svg>

    <!-- Clouds -->
    <svg class="ped ped-cloud ped-cloud-1" viewBox="0 0 80 40" width="80" height="40" aria-hidden="true">
      <ellipse cx="30" cy="28" rx="20" ry="12" fill="#fff" opacity="0.6" />
      <ellipse cx="50" cy="26" rx="18" ry="14" fill="#fff" opacity="0.6" />
      <ellipse cx="40" cy="20" rx="22" ry="14" fill="#fff" opacity="0.7" />
    </svg>
    <svg class="ped ped-cloud ped-cloud-2" viewBox="0 0 60 30" width="60" height="30" aria-hidden="true">
      <ellipse cx="22" cy="20" rx="16" ry="10" fill="#fff" opacity="0.4" />
      <ellipse cx="38" cy="18" rx="14" ry="11" fill="#fff" opacity="0.4" />
      <ellipse cx="30" cy="14" rx="18" ry="11" fill="#fff" opacity="0.5" />
    </svg>

    <!-- Rainbow -->
    <svg class="ped ped-rainbow" viewBox="0 0 120 60" width="120" height="60" aria-hidden="true">
      <path d="M10,55 Q60,0 110,55" fill="none" stroke="#FF9EB5" stroke-width="3.5" />
      <path d="M17,55 Q60,5 103,55" fill="none" stroke="#FFE5A3" stroke-width="3.5" />
      <path d="M24,55 Q60,10 96,55" fill="none" stroke="#98D8C8" stroke-width="3.5" />
      <path d="M31,55 Q60,15 89,55" fill="none" stroke="#87CEEB" stroke-width="3.5" />
      <path d="M38,55 Q60,20 82,55" fill="none" stroke="#C3B1E1" stroke-width="3.5" />
    </svg>

    <!-- Balloons -->
    <svg class="ped ped-balloon ped-balloon-1" viewBox="0 0 30 42" width="28" height="40" aria-hidden="true">
      <ellipse cx="15" cy="18" rx="13" ry="16" fill="#FF9EB5" />
      <path d="M15,34 Q14,38 12,42" fill="none" stroke="#FF7B89" stroke-width="1.2" />
      <path d="M15,34 Q16,38 18,42" fill="none" stroke="#FF7B89" stroke-width="1.2" />
      <ellipse cx="11" cy="14" rx="3" ry="4" fill="rgba(255,255,255,0.35)" />
      <polygon points="15,33 13,31 17,31" fill="#FF7B89" />
    </svg>
    <svg class="ped ped-balloon ped-balloon-2" viewBox="0 0 30 42" width="22" height="34" aria-hidden="true">
      <ellipse cx="15" cy="18" rx="13" ry="16" fill="#87CEEB" />
      <path d="M15,34 Q14,38 12,42" fill="none" stroke="#5BA3D9" stroke-width="1.2" />
      <path d="M15,34 Q16,38 18,42" fill="none" stroke="#5BA3D9" stroke-width="1.2" />
      <ellipse cx="11" cy="14" rx="3" ry="4" fill="rgba(255,255,255,0.35)" />
      <polygon points="15,33 13,31 17,31" fill="#5BA3D9" />
    </svg>

    <!-- Butterflies -->
    <svg class="ped ped-butterfly ped-butterfly-1" viewBox="0 0 36 28" width="30" height="24" aria-hidden="true">
      <ellipse cx="18" cy="14" rx="2" ry="7" fill="#C3B1E1" />
      <ellipse cx="8" cy="10" rx="7" ry="5" fill="#FF9EB5" transform="rotate(-20,8,10)" />
      <ellipse cx="28" cy="10" rx="7" ry="5" fill="#FF9EB5" transform="rotate(20,28,10)" />
      <ellipse cx="9" cy="21" rx="5" ry="4" fill="#C3B1E1" transform="rotate(20,9,21)" />
      <ellipse cx="27" cy="21" rx="5" ry="4" fill="#C3B1E1" transform="rotate(-20,27,21)" />
    </svg>
    <svg class="ped ped-butterfly ped-butterfly-2" viewBox="0 0 36 28" width="20" height="16" aria-hidden="true">
      <ellipse cx="18" cy="14" rx="2" ry="7" fill="#98D8C8" />
      <ellipse cx="8" cy="10" rx="7" ry="5" fill="#FFE5A3" transform="rotate(-20,8,10)" />
      <ellipse cx="28" cy="10" rx="7" ry="5" fill="#FFE5A3" transform="rotate(20,28,10)" />
      <ellipse cx="9" cy="21" rx="5" ry="4" fill="#98D8C8" transform="rotate(20,9,21)" />
      <ellipse cx="27" cy="21" rx="5" ry="4" fill="#98D8C8" transform="rotate(-20,27,21)" />
    </svg>

    <!-- Sparkles -->
    <svg class="ped ped-sparkle ped-sparkle-1" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" fill="#FFE5A3" />
    </svg>
    <svg class="ped ped-sparkle ped-sparkle-2" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" fill="#FFD700" opacity="0.7" />
    </svg>
  </div>
</template>

<style scoped>
/* ====================================================
   PEDIATRIC FLOATING DECORATIONS
   Absolutely positioned doodles with gentle animations.
   ==================================================== */
.ped-floaties {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.ped {
  position: absolute;
  animation: ped-float 8s ease-in-out infinite;
}

/* ── Positioning ── */
.ped-tooth-1 {
  top: 12%;
  right: 8%;
  animation-delay: 0s;
  animation-duration: 7s;
}

.ped-tooth-2 {
  bottom: 18%;
  left: 6%;
  animation-delay: 2s;
  animation-duration: 9s;
}

.ped-star-1 {
  top: 25%;
  left: 12%;
  animation-delay: 1s;
  animation-duration: 5s;
}

.ped-star-2 {
  bottom: 35%;
  right: 15%;
  animation-delay: 3s;
  animation-duration: 6s;
}

.ped-heart-1 {
  top: 40%;
  left: 5%;
  animation-delay: 0.5s;
  animation-duration: 6s;
}

.ped-heart-2 {
  bottom: 25%;
  right: 20%;
  animation-delay: 1.5s;
  animation-duration: 5s;
}

.ped-cloud-1 {
  top: 5%;
  left: 15%;
  animation-delay: 0s;
  animation-duration: 12s;
}

.ped-cloud-2 {
  top: 55%;
  right: 5%;
  animation-delay: 4s;
  animation-duration: 14s;
}

.ped-rainbow {
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  animation: ped-float 12s ease-in-out infinite;
  animation-delay: 0s;
  opacity: 0.6;
}

.ped-balloon-1 {
  top: 8%;
  left: 18%;
  animation: ped-balloon-drift 6s ease-in-out infinite;
  animation-delay: 0s;
}

.ped-balloon-2 {
  top: 20%;
  right: 12%;
  animation: ped-balloon-drift 7s ease-in-out infinite;
  animation-delay: 1.5s;
}

.ped-butterfly-1 {
  top: 45%;
  left: 3%;
  animation: ped-butterfly 5s ease-in-out infinite;
  animation-delay: 0.8s;
}

.ped-butterfly-2 {
  bottom: 30%;
  right: 8%;
  animation: ped-butterfly 6s ease-in-out infinite;
  animation-delay: 2.2s;
}

.ped-sparkle-1 {
  top: 15%;
  left: 28%;
  animation: ped-twinkle 3s ease-in-out infinite;
  animation-delay: 0.3s;
}

.ped-sparkle-2 {
  bottom: 40%;
  left: 45%;
  animation: ped-twinkle 2.5s ease-in-out infinite;
  animation-delay: 1.8s;
}

/* ── Keyframes ── */
@keyframes ped-float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  25% {
    transform: translateY(-12px) rotate(3deg);
  }

  50% {
    transform: translateY(-6px) rotate(-2deg);
  }

  75% {
    transform: translateY(-15px) rotate(4deg);
  }
}

@keyframes ped-balloon-drift {

  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }

  30% {
    transform: translateY(-18px) rotate(2deg);
  }

  60% {
    transform: translateY(-8px) rotate(-1deg);
  }

  80% {
    transform: translateY(-22px) rotate(3deg);
  }
}

@keyframes ped-butterfly {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(8px, -12px) rotate(5deg);
  }

  50% {
    transform: translate(-4px, -6px) rotate(-3deg);
  }

  75% {
    transform: translate(10px, -18px) rotate(6deg);
  }
}

@keyframes ped-twinkle {

  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {

  .ped-tooth-1,
  .ped-tooth-2 {
    width: 30px;
    height: 30px;
  }

  .ped-cloud-1,
  .ped-cloud-2 {
    width: 50px;
    height: 25px;
  }
}

@media (max-width: 480px) {
  .ped {
    display: none;
  }
}
</style>
