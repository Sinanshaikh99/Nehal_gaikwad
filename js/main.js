document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger)

  const menuButton = document.querySelector('#menuBtn')
  const mobileMenu = document.querySelector('#mobileMenu')
  const nav = document.querySelector('.nav')

  menuButton?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open')
    menuButton.textContent = isOpen ? 'Close ×' : 'Menu +'
    menuButton.setAttribute('aria-expanded', String(isOpen))
  })

  document.querySelectorAll('#mobileMenu a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open')
      menuButton.textContent = 'Menu +'
      menuButton.setAttribute('aria-expanded', 'false')
    })
  })

  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 24), { passive: true })

  const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
  intro.from('.nav', { y: -30, opacity: 0, duration: 0.8 })
    .from('.hero-kicker', { y: 25, opacity: 0, duration: 0.6 }, '-=.35')
    .from('.hero-title', { y: 90, opacity: 0, duration: 1.15, skewY: 3 }, '-=.35')
    .from('.hero-title em', { color: '#f3efe7', duration: 0.8 }, '-=.6')
    .from('.hero-title ~ div', { y: 25, opacity: 0, duration: 0.7 }, '-=.55')

  gsap.utils.toArray('section:not(:first-child) > *').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      y: 35, opacity: 0, duration: 0.9, ease: 'power3.out'
    })
  })

  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      y: 60, opacity: 0, rotate: index % 2 ? 1.5 : -1.5, duration: 1, delay: index * 0.08, ease: 'power3.out'
    })
  })

  gsap.to('.hero-title', {
    yPercent: -12,
    ease: 'none',
    scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true }
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (!target) return
      event.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
})
