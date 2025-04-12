// let x; //判斷html按超過一次
// let positionx1,positiony1,positionz1; //紀錄落地停止位置
//     let scene;
// scene = new THREE.Scene();


function draw(initisped,elevang,direcang){

    // location.reload(true);
    let golf;
    let hight;
    let scene;

    let camera;
    let renderer; //ball

    let Vx=initisped*Math.cos(elevang)*Math.sin(direcang);
    let Vy=initisped*Math.sin(elevang);
    let Vz=initisped*Math.cos(elevang)*Math.cos(direcang);
    let tcount=0;
    let tstep=0.003;
    let acceleration = 9.8;

    let m=73.5; //質量 g
    let k=0.42; //球體阻力係數 f=-kv


    let tcount1=0; //彈跳計時
    let tcount2=0; //複製tcount做判斷
    let positionx=0;
    let positiony=0;
    let positionz=0; //站存位置用
    let Vx1=0.2*Vx;
    let Vz1=0.2*Vz;
    let Vy1=0.2*Vy; //彈跳速度初始條件
    const points = [];

    points.push(new THREE.Vector3(0,0,0));
    const material = new THREE.LineBasicMaterial({
        color: 'blue'
    });
      
    function creatball(){

        scene = new THREE.Scene();
        scene.background=new THREE.Color(0xaaaaaa);
        scene.updateMatrixWorld(true);

        camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 45, 30000 );
        // camera.rotation.y = 45/180*Math.PI;
        camera.position.set(0,300,-900);
        camera.lookAt(scene.position);

        let axes = new THREE.AxesHelper(20);
        scene.add(axes);
        // var fov = camera.fov, zoom = 1.0, inc = -0.01;

        hight=new THREE.AmbientLight(0x404040,100);
        scene.add(hight);

        directionalLight = new THREE.DirectionalLight(0xbbbbbb,1,100);
        directionalLight.position.set(100,100,100);
        directionalLight.castShadow = true;
        //Set up shadow properties for the light
        directionalLight.shadow.mapSize.width = 512; // default
        directionalLight.shadow.mapSize.height = 512; // default
        directionalLight.shadow.camera.near = 0.5; // default
        directionalLight.shadow.camera.far = 500; // default
        scene.add(directionalLight);

        light = new THREE.PointLight(0xc4c4c4,10);
        light.position.set(0,300,500);
        scene.add(light);
        light2 = new THREE.PointLight(0xc4c4c4,10);
        light2.position.set(500,100,0);
        scene.add(light2);
        light3 = new THREE.PointLight(0xc4c4c4,10);
        light3.position.set(0,100,-500);
        scene.add(light3);
        light4 = new THREE.PointLight(0xc4c4c4,10);
        light4.position.set(-500,300,500);
        scene.add(light4);

        const planeGeometry = new THREE.PlaneGeometry( 5000, 5000, 10, 10);
        const planeMaterial = new THREE.MeshStandardMaterial( { color: 'green' ,side: THREE.DoubleSide} )
        const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        plane.rotation.x=-Math.PI*-0.5;  
        plane.position.y=-8;
        plane.castShadow=false; //
        plane.receiveShadow = true; 
        // scene.add( plane );

        const floorgeometry= new THREE.BoxGeometry(50,1,50);
        const floormaterial = new THREE.MeshStandardMaterial({color: 0xDDDDDD, roughness: 0});
        const floor = new THREE.Mesh( floorgeometry, floormaterial );
        floor.position.set(0, -27, 0);
        floor.name = 'my-floor';
        // scene.add(floor);

        renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        renderer.outputEncoding = THREE.sRGBEncoding; 

        let controls = new THREE.OrbitControls(camera,renderer.domElement);
        controls.minDistance = 500;
        controls.maxDistance = 2000;
        
        let materialArray = []; //background
        let texture_ft = new THREE.TextureLoader().load( 'humble_ft.jpg');
        let texture_bk = new THREE.TextureLoader().load( 'humble_bk.jpg');
        let texture_up = new THREE.TextureLoader().load( 'humble_up.jpg');
        let texture_dn = new THREE.TextureLoader().load( 'humble_dn.jpg');
        let texture_rt = new THREE.TextureLoader().load( 'humble_rt.jpg');
        let texture_lf = new THREE.TextureLoader().load( 'humble_lf.jpg');
        
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
        
        for (let i = 0; i < 6; i++)
           materialArray[i].side = THREE.BackSide; //從裡面看
        let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
        let skybox = new THREE.Mesh( skyboxGeo, materialArray );
        scene.add( skybox );  
    
        let loader = new THREE.GLTFLoader();
        loader.load('model_golf/uploads_files_3559872_Golf+ball.glb', function(glb){ //每次都進來

            golf = glb.scene;

            golf.position.set(0,0,0);
            golf.scale.set(0.07,0.07,0.07);
            golf.name='my-golf'; //方便引用

        
            scene.add(golf);

            animate();

        }); //原本正常執行

        
    }
                    
    function animate() {

        // let requestID; //紀錄返回值
        requestID=requestAnimationFrame(animate);	//為了cancel //只會執行一次

        if((-m*acceleration*tcount2/k+(Vy+m*acceleration/k)*m/k*(1-Math.exp(-k*tcount2/m))).toFixed(5)>=0){ //第一次就進去


            golf.position.z=Vz*m/k*(1-Math.exp(-k*tcount/m));
            golf.position.y=-m*acceleration*tcount/k+(Vy+m*acceleration/k)*m/k*(1-Math.exp(-k*tcount/m));
            golf.position.x=Vx*m/k*(1-Math.exp(-k*tcount/m)); 

            points.push(new THREE.Vector3(golf.position.x,golf.position.y,golf.position.z));
            if(golf.position.y.toFixed(3)==0&&tcount>0){
                 //落到最低點
                positionx=Vx*m/k*(1-Math.exp(-k*tcount/m));
                positiony=0;
                positionz=Vz*m/k*(1-Math.exp(-k*tcount/m)); 
            }
            else if(golf.position.y.toFixed(3)>0){//最低前一點
                positionx=Vx*m/k*(1-Math.exp(-k*(tcount)/m));
                positiony=0;
                positionz=Vz*m/k*(1-Math.exp(-k*(tcount)/m)); //最低後一點
            }
        }

        else if((-m*acceleration*tcount/k+(Vy+m*acceleration/k)*m/k*(1-Math.exp(-k*tcount/m))).toFixed(5)<0){ //最後進來的地方


            if(Math.floor(Vy1)>0){

                golf.position.x=positionx+Vx1*m/k*(1-Math.exp(-k*tcount1/m));
                golf.position.z=positionz+Vz1*m/k*(1-Math.exp(-k*tcount1/m));
                golf.position.y=positiony-m*acceleration*tcount1/k+(Vy1+m*acceleration/k)*m/k*(1-Math.exp(-k*tcount1/m)); //最後球會卡在這
                tcount1+=tstep;	//彈跳

                points.push(new THREE.Vector3(golf.position.x,golf.position.y,golf.position.z));

            }
            if(golf.position.y<0){ //碰地
                golf.position.y=0; //人為校正			

                positionx+=Vx1*m/k*(1-Math.exp(-k*tcount1/m));
                positiony+=golf.position.y;
                positionz+=Vz1*m/k*(1-Math.exp(-k*tcount1/m)); //紀錄位置
                Vx1=0.2*Vx1;
                Vy1=0.2*Vy1;
                Vz1=0.2*Vz1;
                tcount1=0;					//最後不會進來這
            }
        }
        
        if((-m*acceleration*tcount2/k+(Vy+m*acceleration/k)*m/k*(1-Math.exp(-k*tcount2/m))).toFixed(5)>=0){
            tcount+=tstep; //最後一筆會讓y是第一個負值 //如果Vy沒值??
            tcount2=tcount;
        }

        camera.lookAt(golf.position.x,golf.position.y,golf.position.z); //看球

        document.getElementById("xvalue").innerHTML = Math.abs(golf.position.x.toFixed(3));
        document.getElementById("yvalue").innerHTML = golf.position.y.toFixed(3);
        document.getElementById("zvalue").innerHTML = Math.abs(golf.position.z.toFixed(3)); 

        document.getElementById("x").innerHTML = Math.abs((Vx*2*Vy/acceleration).toFixed(3)); //
        document.getElementById("y").innerHTML = tcount.toFixed(3); //從0開始
        document.getElementById("z").innerHTML = requestID.toFixed(3); //預判

        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, material );
        scene.add( line );
        
        renderer.render(scene,camera);

    }
    creatball();
}
