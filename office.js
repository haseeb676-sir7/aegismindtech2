class Office3DScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.isAutoRotating = false;
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('office3d').appendChild(this.renderer.domElement);

        // Setup camera
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);

        // Create office elements
        this.createOffice();

        // Add lights
        this.addLighting();

        // Setup controls
        this.setupControls();

        // Start animation
        this.animate();
    }

    createOffice() {
        // Floor
        const floorGeometry = new THREE.BoxGeometry(10, 0.2, 10);
        const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x4B0082 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.scene.add(floor);

        // Walls
        const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xE6E6FA });
        
        // Back wall
        const backWall = new THREE.Mesh(
            new THREE.BoxGeometry(10, 5, 0.2),
            wallMaterial
        );
        backWall.position.set(0, 2.5, -5);
        this.scene.add(backWall);

        // Side wall
        const sideWall = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 5, 10),
            wallMaterial
        );
        sideWall.position.set(-5, 2.5, 0);
        this.scene.add(sideWall);

        // Add desks, computers, and decorative elements
        this.addFurniture();
    }

    addFurniture() {
        // Desk material
        const deskMaterial = new THREE.MeshPhongMaterial({ color: 0xFF69B4 });
        
        // Create desks
        const desk1 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.1, 1),
            deskMaterial
        );
        desk1.position.set(-2, 1, -2);
        this.scene.add(desk1);

        const desk2 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.1, 1),
            deskMaterial
        );
        desk2.position.set(2, 1, -2);
        this.scene.add(desk2);

        // Add monitors
        this.addMonitors();
    }

    addMonitors() {
        const monitorMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });

        // Create monitor function
        const createMonitor = (x, z) => {
            const monitor = new THREE.Group();
            
            const screen = new THREE.Mesh(
                new THREE.BoxGeometry(0.8, 0.5, 0.05),
                screenMaterial
            );
            
            const stand = new THREE.Mesh(
                new THREE.BoxGeometry(0.1, 0.3, 0.1),
                monitorMaterial
            );
            
            stand.position.y = -0.25;
            monitor.add(screen);
            monitor.add(stand);
            monitor.position.set(x, 1.4, z);
            this.scene.add(monitor);
        };

        // Add monitors to desks
        createMonitor(-2, -2);
        createMonitor(2, -2);
    }

    addLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    setupControls() {
        document.getElementById('rotateLeft').addEventListener('click', () => {
            this.rotateScene(-Math.PI / 4);
        });

        document.getElementById('rotateRight').addEventListener('click', () => {
            this.rotateScene(Math.PI / 4);
        });

        document.getElementById('autoRotate').addEventListener('click', () => {
            this.isAutoRotating = !this.isAutoRotating;
        });
    }

    rotateScene(angle) {
        this.scene.rotation.y += angle;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.isAutoRotating) {
            this.scene.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the 3D scene
window.addEventListener('DOMContentLoaded', () => {
    const office = new Office3DScene();

    // Handle window resize
    window.addEventListener('resize', () => {
        office.camera.aspect = window.innerWidth / window.innerHeight;
        office.camera.updateProjectionMatrix();
        office.renderer.setSize(window.innerWidth, window.innerHeight);
    });
}); 