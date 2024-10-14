document.getElementById('generateBtn').addEventListener('click', async () => {
    // Gather files and mod types for Mod 1
    const meshFile1 = document.getElementById('mesh1').files[0];
    const textureFile1 = document.getElementById('texture1').files[0];
    const iconFile1 = document.getElementById('icon1').files[0];
    const nameFile1 = document.getElementById('name1').files[0];
    const modType1 = document.getElementById('modSelect1').value;

    // Gather files and mod types for Mod 2
    const meshFile2 = document.getElementById('mesh2').files[0];
    const textureFile2 = document.getElementById('texture2').files[0];
    const iconFile2 = document.getElementById('icon2').files[0];
    const nameFile2 = document.getElementById('name2').files[0];
    const modType2 = document.getElementById('modSelect2').value;

    // Check if all files and mod types are selected for both mods
    if ((!meshFile1 || !textureFile1 || !iconFile1 || !nameFile1 || !modType1) &&
        (!meshFile2 || !textureFile2 || !iconFile2 || !nameFile2 || !modType2)) {
        alert('Please select all files and a mod type for at least one mod.');
        return;
    }

    const zip = new JSZip();
    const modNames = {
        // Plushies
        Pigni: { mesh: 'PiggyA_Mesh.obj', texture: 'T_PiggyA.png', icon: 'Icon_PiggyA.png', name: 'Pigni Plushie_NAME.txt' },
        Nanomite: { mesh: 'GolemA_Mesh.obj', texture: 'T_GolemA.png', icon: 'Icon_GolemA.png', name: 'Nanomite Plushie_NAME.txt' },
        Ministar: { mesh: 'StarfishA_Mesh.obj', texture: 'T_StarfishA.png', icon: 'Icon_StarfishA.png', name: 'Minstar Plushie_NAME.txt' },
        Nocti: { mesh: 'BatA_Mesh.obj', texture: 'T_BatA.png', icon: 'Icon_BatA.png', name: 'Nocti Plushie_NAME.txt' },
        Blazoar: { mesh: 'PiggyD_Mesh.obj', texture: 'T_PiggyD.png', icon: 'Icon_Toy_PiggyD.png', name: 'Blazoar Plushie_NAME.txt' },
        Kingstar: { mesh: 'StarfishD_Mesh.obj', texture: 'T_StarfishD.png', icon: 'Icon_Toy_StarfishD.png', name: 'Kingstar Plushie_NAME.txt' },
        Bonfiox: { mesh: 'FoxB_Mesh.obj', texture: 'T_FoxB.png', icon: 'Icon_Toy_FoxB.png', name: 'Bonfiox Plushie_NAME.txt' },
        ToonZ: { mesh: 'ToonZ_Plushie.obj', texture: 'T_ToonZPlushie.png', icon: 'Icon_Toy_ToonZ.png', name: 'ToonZ Plushie_NAME.txt' },
        // Figurines
        Burpig: { mesh: 'Figurine_PigB_Mesh.obj', texture: 'T_PiggyB.png', icon: 'Icon_Toy_PiggyB.png', name: 'Burpig Figurine_NAME.txt' },
        Decimite: { mesh: 'Figurine_GolemB_Mesh.obj', texture: 'T_GolemB.png', icon: 'Icon_Toy_GolemB.png', name: 'Decimite Figurine_NAME.txt' },
        Trickstar: { mesh: 'Figurine_StarfishB_Mesh.obj', texture: 'T_StarfishB.png', icon: 'Icon_Toy_StarfishB.png', name: 'Trickstar Figurine_NAME.txt' },
        Lunight: { mesh: 'Figurine_BatB_Mesh.obj', texture: 'T_BatB.png', icon: 'Icon_Toy_BatB.png', name: 'Lunight Figurine_NAME.txt' },
        Inferhog: { mesh: 'Figurine_PiggyC_Mesh.obj', texture: 'T_PiggyB.png', icon: 'Icon_Toy_PiggyC.png', name: 'Inferhog Figurine_NAME.txt' },
        Meganite: { mesh: 'Figurine_GolemC_Mesh.obj', texture: 'T_GolemC.png', icon: 'Icon_Toy_GolemC.png', name: 'Meganite Figurine_NAME.txt' },
        Princestar: { mesh: 'Figurine_StarfishC_Mesh.obj', texture: 'T_StarfishC.png', icon: 'Icon_Toy_StarfishC.png', name: 'Princestar Figurine_NAME.txt' },
        Vampicant: { mesh: 'Figurine_BatC_Mesh.obj', texture: 'T_BatC.png', icon: 'Icon_Toy_BatC.png', name: 'Vampicant Figurine_NAME.txt' },
        Giganite: { mesh: 'GolemD_Mesh.obj', texture: 'T_GolemD.png', icon: 'Icon_Toy_GolemD.png', name: 'Giganite Statue_NAME.txt' },
        Dracunix: { mesh: 'BatD_Mesh.obj', texture: 'T_BatD.png', icon: 'Icon_Toy_BatD.png', name: 'Dracunix Figurine_NAME.txt' },
        Drilceros: { mesh: 'Beetle_Mesh.obj', texture: 'T_Beetle.png', icon: 'Icon_Toy_Beetle.png', name: 'Drilceros Action Figure_NAME.txt' },
    };

    // Create directories and add files to the zip for Mod 1
    if (modType1) {
        const selectedNames1 = modNames[modType1];

        const objectsMesh1 = zip.folder('BepinEx/plugins/TextureReplacer/objects_meshes');
        objectsMesh1.file(selectedNames1.mesh, await readFile(meshFile1));

        const objectsTextures1 = zip.folder('BepinEx/plugins/TextureReplacer/objects_textures');
        objectsTextures1.file(selectedNames1.texture, await readFile(textureFile1));
        objectsTextures1.file(selectedNames1.icon, await readFile(iconFile1));

        const objectsData1 = zip.folder('BepinEx/plugins/TextureReplacer/objects_data/figurines');
        objectsData1.file(selectedNames1.name, await readFile(nameFile1));
    }

    // Create directories and add files to the zip for Mod 2
    if (modType2) {
        const selectedNames2 = modNames[modType2];

        const objectsMesh2 = zip.folder('BepinEx/plugins/TextureReplacer/objects_meshes');
        objectsMesh2.file(selectedNames2.mesh, await readFile(meshFile2));

        const objectsTextures2 = zip.folder('BepinEx/plugins/TextureReplacer/objects_textures');
        objectsTextures2.file(selectedNames2.texture, await readFile(textureFile2));
        objectsTextures2.file(selectedNames2.icon, await readFile(iconFile2));

        const objectsData2 = zip.folder('BepinEx/plugins/TextureReplacer/objects_data/figurines');
        objectsData2.file(selectedNames2.name, await readFile(nameFile2));
    }

    // Generate the zip file and trigger download
    zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'mod.zip');
    }).catch(err => {
        console.error('Error generating zip file:', err);
        alert('Error generating the zip file. Check console for details.');
    });
});

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}
