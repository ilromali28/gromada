gsap.registerPlugin(ScrollTrigger)

class buildGallery {
    constructor() {
        // setup
        this.teams = document.querySelectorAll('.team-block')
        this.employes = []

        // Get images and info of team
        this.teams.forEach(team => {
            const employes = team.querySelectorAll('.employee')
            employes.forEach(employee => {
                const employeeData = {
                    image: null,
                    name: null,
                    role: null
                }
                const image = employee.querySelector('.employee__image')
                const name = employee.querySelector('.employee__name')
                const role = employee.querySelector('.employee__role')

                if (image) {
                    employeeData.image = image.src
                }
                if (name) {
                    employeeData.name = name.innerText

                }
                if (role) {
                    employeeData.role = role.innerText
                }
                this.employes.push(employeeData)
            })
        })

        this.builder()
    }
    builder() {
        const targetBlock = document.querySelector('.team-container')

        const galleryWarpper = document.createElement('div')
        galleryWarpper.classList.add('teamGallery')

        const pinedBlockWrap = document.createElement('div')
        pinedBlockWrap.classList.add('list')

        const endOfScroll = document.createElement('div')
        endOfScroll.id = 'end'

        const pinedBlock = document.createElement('div')
        pinedBlock.id = 'pin-container'
        pinedBlock.classList.add('list__role')


        // Add default template to page
        pinedBlockWrap.appendChild(pinedBlock)
        galleryWarpper.appendChild(pinedBlockWrap)
        galleryWarpper.appendChild(endOfScroll)
        targetBlock.appendChild(galleryWarpper)

        this.employes.forEach(employee => {
            // Create element
            const employeeWrap = document.createElement('div')
            employeeWrap.classList.add('member__info')

            const employeeName = document.createElement('span')
            employeeName.classList.add('member__row', 'text_large')

            // Push to page
            employeeName.insertAdjacentText('beforeend', employee.name)
            employeeWrap.appendChild(employeeName)
            if (employee.role) {
                // Create element
                const employeeRole = document.createElement('span')
                employeeRole.classList.add('member__row', 'text_small')

                // Push to page
                employeeRole.insertAdjacentText('beforeend', employee.role)
                employeeWrap.appendChild(employeeRole)
            }
            pinedBlock.appendChild(employeeWrap)
        })
    }
}

class Gallery {
    constructor() {
        this.threeGallery = new buildGallery()
        this.employes = this.threeGallery.employes

        this.gallery = this.employes.map(employee => employee.image)
        this.galleryText = [...document.querySelectorAll('.member__info')]


        this.scene = new THREE.Scene()
        this.textureLoader = new THREE.TextureLoader()

        this.images = []
        this.toLoad = this.employes.length
        this.loaded = 0

        this.calculatedID = 0
        this.sizes = {
            height: window.innerHeight,
            width: document.documentElement.clientWidth
        }
        this.circleShapeParameters = {
            count: this.gallery.length,
            doubleCount: this.gallery.length * 2,
            radius: (this.gallery.length * 2) / (Math.PI * 1.75),
            theta: Math.PI * 0.5,
            scale: 0.9,
            yPosition: 0
        }

        this.animationHandler = {
            value: null,
            scroll: 0,
            played: false,
        }
        this.customUniformsArray = []
        this.customUniforms = {
            uTime: { value: 0 },
            uVelocity: { value: 0 },
        }
        this.clock = new THREE.Clock()

        if (this.employes) {
            // text splitter
            this.titleSplitter()
            this.loadMaterial()
                // init
            this.generateCircularShape()
            this.initCamera()
            this.initRenderer()

            // events
            this.resizeEvent()

            this.tick()
        }

        gsap.registerEffect({
            name: "textAnimation",
            extendTimeline: true,
            effect: (targets, config) => {
                const tl = gsap.timeline({
                    defaults: {
                        ease: 'poswer4.in',
                        transformOrigin: 'center center 0.47em',
                        overwrite: 'auto',
                        transformPerspective: 1000,
                        stagger: {
                            amount: 0.2,
                        }
                    }
                })
                tl.fromTo(targets, {
                    y: config.fromY,
                    rotate: config.fromRotate,
                    rotateX: config.fromRotateX,
                    rotateY: config.fromRotateY,
                    zIndex: config.fromZIndex
                }, {
                    y: config.toY,
                    rotate: config.toRotate,
                    rotateX: config.toRotateX,
                    rotateY: config.toRotateY,
                    zIndex: config.toZIndex
                })
                return tl
            }
        })

    }
    loadMaterial() {
        this.employes.forEach(employee => {
            this.textureLoader.load(employee.image, (file) => {
                this.sourceLoaded(file)
            })
        })
    }
    sourceLoaded(file) {
        this.images.push(file)
        this.loaded++
            if (this.loaded === this.toLoad) {
                // add geometry
                this.addGallery()
            }
    }

    titleSplitter() {
        this.galleryText.forEach(el => {
            if (!el.hasChildNodes()) return;
            const childSpan = [...el.children]
            childSpan.forEach(el => {
                const text = el.textContent.split('')
                el.innerHTML = ''
                const target = el
                const wrapedText = text.map(el => {
                    const span = document.createElement('span')
                    if (el === ' ') {
                        span.insertAdjacentHTML('beforeend', '&nbsp;')
                    } else {
                        span.innerText = el
                    }
                    target.appendChild(span)
                })
            })
        })

        // set start position
        gsap.set('.member__info span span', {
            y: '0.35em',
            rotate: '-4deg',
            rotateX: '-90deg',
            rotateY: '4deg'
        })
    }
    initCamera() {
        const { width, height } = this.sizes
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5)
        this.camera.position.set(0, 0, this.circleShapeParameters.radius + 2.2)

        this.scene.add(this.camera)
    }

    generateCircularShape() {
        const { radius, theta, doubleCount } = this.circleShapeParameters
        this.circleShape = new THREE.CircleGeometry(radius, doubleCount, theta)
        this.stepAngle = (Math.PI * 2) / doubleCount
    }
    addGallery() {
        const { scale, yPosition } = this.circleShapeParameters

        // base geometry parameters
        this.boxGeometry = new THREE.PlaneBufferGeometry(1, 1.5, 10, 10 * 1.5)
        this.boxMaterial = new THREE.ShaderMaterial({
            uniforms: this.customUniforms,
            vertexShader: `
        uniform float uVelocity;
        uniform float uTime;

        varying vec2 vUv;
        varying float vHeight;
        void main() {
          vec3 st = position;
          st.z += pow( cos(3.14 * st.x / 2.0), 1.5 ) / 9.0;
          st.z += 0.1;


          // velocity based value
          float xDeformation = 1.0 - pow( abs(sin(3.1456 * (uv.y + 0.5) / 2.0)), 1.5);
          st.x += mix(0.0, xDeformation, uVelocity * 0.45);
          st.y += mix(0.0, cos(uTime * 4.0 + st.x * 6.0) / 15.0, uVelocity * 0.25);
          st.z += mix(0.0, 0.9, (uVelocity * 0.05));
          st.z += mix(0.0, sin(uTime * 4.0 + (st.y * 2.0 - st.x * 3.0) * 2.0) / 15.0, (uVelocity * 0.25));

          vec4 modelPosition = modelMatrix * vec4(st, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          gl_Position = projectionMatrix * viewPosition;

          vHeight = st.z;
          vUv = uv;
        }
      `,
            fragmentShader: `
        uniform float uVelocity;
        uniform float uActive;
        uniform sampler2D uTexture;

        varying vec2 vUv;
        varying float vHeight;
        void main() {
          vec2 newUV = vUv;
          newUV = mix( (newUV - 0.5) / 1.0 + 0.5, (newUV - 0.5) / 1.5 + 0.5, clamp(uVelocity * 0.2, -0.5, 0.5) );
          newUV += vHeight * 0.1;

          vec4 texelColor = texture2D( uTexture, newUV );
          vec3 grayscale = vec3( 0.21 * texelColor.r + 0.71 * texelColor.g +  0.07 * texelColor.b );
          texelColor.rgb = mix( grayscale * 0.3, texelColor.rgb, uActive);
          gl_FragColor = vec4(texelColor.rgb,1.0);
        }
      `
        })
        const positions = this.circleShape.getAttribute('position').array
        this.group = new THREE.Group()

        // Create geometry on each circle vertices
        // Start from 1 because 0 is center
        this.employes.forEach((employee, i) => {
            const texture = this.images.find(texture => texture.image.currentSrc === employee.image)
            this.addItem(i + 1, positions, texture)
        })

        this.group.scale.setScalar(scale)
        this.group.position.y = yPosition
        this.scene.add(this.group)
    }
    addItem(i, positions, texture) {

        const i3 = i * 3
        const material = this.boxMaterial.clone()
        const uActive = { value: 0 }
        this.customUniformsArray.push(uActive)

        const tempUNIFORM = {
            uActive: this.customUniformsArray[i - 1],
            uTexture: { value: texture }
        }
        material.uniforms = Object.assign(tempUNIFORM, this.customUniforms)
        const boxMesh = new THREE.Mesh(
                this.boxGeometry.clone(),
                material
            )
            // aply positions but flip z and y values
        boxMesh.position.set(
            positions[i3 + 0] * -1,
            positions[i3 + 2],
            positions[i3 + 1]
        )
        boxMesh.rotation.y = this.stepAngle * (i - 1)
        this.group.add(boxMesh)
    }

    /**
     * Scroll animation
     */
    scrollEvent() {
        new ScrollTrigger.enable()
        const init = () => {
            // text animation
            const ID = this.calculatedID
            const targetIN = this.galleryText[ID].querySelectorAll('span span')

            const showText = gsap.timeline()
            showText.textAnimation(targetIN, {
                fromY: '0.35em',
                fromRotate: '-4deg',
                fromRotateX: '-90deg',
                fromRotateY: '4deg',
                fromZIndex: -1,
                toY: '0',
                toRotate: '0',
                toRotateX: '0',
                toRotateY: '0',
                toZIndex: 1
            })

            this.animationHandler.scroll = ID
            this.animationHandler.played = true
        }
        init()


        const tl = gsap.timeline({
            paused: true,
            ease: 'none',
        })
        tl.to(this.group.rotation, {
            y: (this.group.children.length - 1) * this.stepAngle * -1,
            ease: 'none',
        }, 0)

        new ScrollTrigger.create({
            id: 'scrolling',
            animation: tl,
            trigger: '#pin-container',
            pin: true,
            start: "top top",
            endTrigger: '#end',
            end: 'top bottom',
            pinSpacing: false,
            scrub: 1.2,
            onUpdate: (self) => {
                const velTL = gsap.timeline({
                    defaults: {
                        overwrite: 'auto',
                        duration: 0.6,
                        ease: 'power'
                    }
                })
                velTL.to(this.customUniforms.uVelocity, {
                    value: self.getVelocity() / 800
                })
            },
            onScrubComplete: () => {
                if (this.animationHandler.scroll !== this.calculatedID) {
                    const targetIN = this.galleryText[this.calculatedID].querySelectorAll('span span')
                    const targetOUT = this.galleryText[this.animationHandler.scroll].querySelectorAll('span span')

                    const tl = gsap.timeline()
                    tl.textAnimation(targetOUT, {
                        fromY: '0',
                        fromRotate: '0',
                        fromRotateX: '0',
                        fromRotateY: '0',
                        fromZIndex: 1,
                        toY: '-0.7em',
                        toRotate: '4deg',
                        toRotateX: '90deg',
                        toRotateY: '4deg',
                        toZIndex: -1
                    })
                    tl.textAnimation(targetIN, {
                        fromY: '0.65em',
                        fromRotate: '-4deg',
                        fromRotateX: '-90deg',
                        fromRotateY: '4deg',
                        fromZIndex: -1,
                        toY: '0',
                        toRotate: '0',
                        toRotateX: '0',
                        toRotateY: '0',
                        toZIndex: 1
                    }, '<+=30%')

                    this.animationHandler.scroll = this.calculatedID
                }
            },
        });


        // ScrollTrigger
        new ScrollTrigger.addEventListener("scrollEnd", () => {
            gsap.to(this.customUniforms.uVelocity, {
                value: 0,
                overwrite: 'auto',
                ease: 'power'
            })
        })

        // initial play
        new ScrollTrigger.update()
        new ScrollTrigger.addEventListener("refresh", () => {
            if (!this.animationHandler.played) {
                init()
            }
        })

    }
    removeScroll() {
            new ScrollTrigger.getById('scrolling').kill()
        }
        /**
         * Resize
         */
    resizeEvent() {
        window.addEventListener('resize', () => {
            if (this.sizes.width !== document.documentElement.clientWidth) {
                // Update sizes
                this.sizes.width = document.documentElement.clientWidth
                this.sizes.height = window.innerHeight

                // Update camera
                this.camera.aspect = this.sizes.width / this.sizes.height
                this.camera.updateProjectionMatrix()

                // Update renderer
                this.renderer.setSize(this.sizes.width, this.sizes.height)
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

                // update scrolltrigger
                new ScrollTrigger.refresh()
            }
        })
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.render(this.scene, this.camera)

        // add to page
        document.querySelector('.list__role').appendChild(this.renderer.domElement)
    }
    tick() {
        if (!this.employes) return

        const elapsedTime = this.clock.getElapsedTime()
        this.renderer.render(this.scene, this.camera)

        // animate text
        this.customUniforms.uTime.value = elapsedTime
        if (this.group && this.stepAngle) {
            this.calculatedID = Math.round(Math.abs(this.group.rotation.y) / this.stepAngle)
            if (this.animationHandler.value !== this.calculatedID) {
                this.group.children.forEach((el, i) => {
                    if (this.calculatedID === i) {
                        gsap.to(this.customUniformsArray[i], { value: 1, duration: 2, overwrite: 'auto' })
                    } else {
                        gsap.to(this.customUniformsArray[i], { value: 0, overwrite: 'auto' })
                    }
                })
            }

            this.animationHandler.value = this.calculatedID
        }

        window.requestAnimationFrame(this.tick.bind(this))
    }
}
document.addEventListener('DOMContentLoaded', (event) => {

    const gallery = new Gallery()

    const toggleButton = document.getElementById('galleryToggle')
    const toggleAnimation = gsap.timeline({
        paused: true,
    })
    toggleAnimation.to('#galleryToggle .two-d', {
        opacity: 0
    })
    toggleAnimation.to('#galleryToggle svg', {
        x: 28,
    }, "<+=25%")
    toggleAnimation.fromTo('#galleryToggle .three-d', { opacity: 0 }, {
        opacity: 1
    }, "<")
    const toggleContent = gsap.timeline({
        paused: true,
    })
    toggleContent.fromTo('.teamGallery', { display: 'none' }, {
        display: 'block',
        duration: 0.1
    })
    toggleContent.to('.team-block', {
        y: 150,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power1.inOut',
        stagger: 0.05
    })
    toggleContent.to('.teamGallery', {
        autoAlpha: 1
    })
    toggleContent.to('.teamGallery > *', {
        autoAlpha: 1
    })
    toggleContent.to('.team-block', {
        display: 'none',
        duration: 0.1
    })

    let counter = 0
    let parentGallery = document.querySelector('.team-container')
    toggleButton.onclick = (e) => {
        counter++
        if (counter % 2 === 0) {
            toggleAnimation.reverse()
            toggleContent.reverse()
            parentGallery.classList.remove('active')

            gallery.removeScroll()
        } else {
            toggleAnimation.play()
            toggleContent.play()
            parentGallery.classList.add('active')

            gallery.scrollEvent()
        }
    }
});