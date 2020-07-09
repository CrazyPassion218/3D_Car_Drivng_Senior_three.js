import * as CANNON from 'cannon';
import * as THREE from 'three';
import * as Utils from '../../core/Utilities';
import { IPhysicsType } from '../../interfaces/IPhysicsType';

export class SphereCollider implements IPhysicsType
{
    public options: any;
    public body: CANNON.Body;
    public debugModel: THREE.Mesh;

    constructor(options: any)
    {
        let defaults = {
            mass: 0,
            position: new CANNON.Vec3(),
            radius: 0.3,
            friction: 0.3
        };
        options = Utils.setDefaults(options, defaults);
        this.options = options;

        let mat = new CANNON.Material("sphereMat");
        mat.friction = options.friction;

        let shape = new CANNON.Sphere(options.radius);
        // shape.material = mat;

        // Add phys sphere
        let physSphere = new CANNON.Body({
            mass: options.mass,
            position: options.position,
            shape
        });
        physSphere.material = mat;

        this.body = physSphere;
        // this.debugModel = this.getVisualModel({ visible: false, wireframe: true });
    }

    // public getVisualModel(options: any): THREE.Mesh
    // {
    //     let defaults = {
    //         visible: true,
    //         wireframe: true
    //     };
    //     options = Utils.setDefaults(options, defaults);

    //     let geometry = new THREE.SphereGeometry(this.options.radius);
    //     let material = new THREE.MeshLambertMaterial({ color: 0xcccccc, wireframe: options.wireframe });
    //     let visualSphere = new THREE.Mesh(geometry, material);
    //     visualSphere.visible = options.visible;

    //     if (!options.wireframe)
    //     {
    //         visualSphere.castShadow = true;
    //         visualSphere.receiveShadow = true;
    //     }

    //     return visualSphere;
    // }
}