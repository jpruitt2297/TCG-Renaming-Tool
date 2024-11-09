document.getElementById('generateBtn').addEventListener('click', async () => {
    // Gather files and mod types for Mod 1
    const meshFile1 = document.getElementById('mesh1').files[0];
    const textureFile1 = document.getElementById('texture1').files[0];
    const iconFile1 = document.getElementById('icon1').files[0];
    const nameFile1 = document.getElementById('name1').files[0];
    const category1 = document.getElementById('categorySelect1').value;
    const modType1 = document.getElementById('modSelect1').value;

    // Gather files and mod types for Mod 2
    const meshFile2 = document.getElementById('mesh2').files[0];
    const textureFile2 = document.getElementById('texture2').files[0];
    const iconFile2 = document.getElementById('icon2').files[0];
    const nameFile2 = document.getElementById('name2').files[0];
    const category2 = document.getElementById('categorySelect2').value;
    const modType2 = document.getElementById('modSelect2').value;

    // Check if all files and mod types are selected for both mods
    /* if ((!meshFile1 || !textureFile1 || !iconFile1 || !nameFile1 || !modType1) && (!meshFile2 || !textureFile2 || !iconFile2 || !nameFile2 || !modType2)) {
        alert('Please select all files and a mod type for at least one mod.');
        return;
    } */

    // Checks if neccessary files are selected for Mod 1
    if ((category1 == 'Playmats') || (category1 == 'Comics')) {
        switch (modType1) {
            case 'Dracunix_No_Name':
                if (!textureFile1 || !iconFile1) {
                    alert('Mod 1\'s selected mod application requires texture and icon files to be selected.');
                    return;
                }
                break;
            default:
                if (!textureFile1 || !iconFile1 || !nameFile1 || !modType1) {
                    alert('Mod 1\'s selected category requires texture, icon, and name files to be selected.');
                    return;
                }
                break;
        }
    }
    else if (!meshFile1 || !textureFile1 || !iconFile1 || !nameFile1 || !modType1) {
        alert('Please select all files and a mod type for Mod 1');
        return;
    };

    // Checks if neccessary files are selected for Mod 2
    if ((category2 == 'Playmats') || (category2 == 'Comics')) {
        switch (modType2) {
            case 'Dracunix_No_Name':
                if (!textureFile2 || !iconFile2) {
                    alert('Mod 2\'s selected mod application requires texture and icon files to be selected.');
                    return;
                }
                break;
            default:
                if (!textureFile2 || !iconFile2 || !nameFile2 || !modType2) {
                    alert('Mod 2\'s selected category requires texture, icon, and name files to be selected.');
                    return;
                }
                break;
        }
    }
    else if (!meshFile2 || !textureFile2 || !iconFile2 || !nameFile2 || !modType2) {
        alert('Please select all files and a mod type for Mod 2');
        return;
    };

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
        // Playmats
        Clamigo: { texture: 'T_PlayMat1.png', icon: 'Icon_Playmat1.png', name: 'Playmat (Clamigo)_NAME.txt' },
        Dracunix: { texture: 'T_PlayMat5.png', icon: 'Icon_Playmat5.png', name: 'Playmat (Dracunix)_NAME.txt' },
        Dracunix_No_Name: { texture: 'T_PlayMat15.png', icon: 'Icon_Playmat15.png'},
        Drakon: { texture: 'T_PlayMat3.png', icon: 'Icon_Playmat3.png', name: 'Playmat (Drakon)_NAME.txt' },
        Drilceros: { texture: 'T_PlayMat2b.png', icon: 'Icon_Playmat2b.png', name: 'Playmat (Drilceros)_NAME.txt' },
        Duel: { texture: 'T_PlayMat2.png', icon: 'Icon_Playmat2.png', name: 'Playmat (Duel)_NAME.txt' },
        Earth: { texture: 'T_PlayMat11.png', icon: 'Icon_Playmat11.png', name: 'Playmat (Earth)_NAME.txt' },
        Fire: { texture: 'T_PlayMat10.png', icon: 'Icon_Playmat10.png', name: 'Playmat (Fire)_NAME.txt' },
        GigatronX_Evo: { texture: 'T_PlayMat7.png', icon: 'Icon_Playmat7.png', name: 'Playmat (GigatronX Evo)_NAME.txt' },
        GigatronX: { texture: 'T_PlayMat16.png', icon: 'Icon_Playmat16.png', name: 'Playmat (GigatronX)_NAME.txt' },
        Katengu_Black: { texture: 'T_PlayMat17.png', icon: 'Icon_Playmat17.png', name: 'Playmat (Katengu Black)_NAME.txt' },
        Katengu_White: { texture: 'T_PlayMat18.png', icon: 'Icon_Playmat18.png', name: 'Playmat (Katengu White)_NAME.txt' },
        Kyrone: { texture: 'T_PlayMat9.png', icon: 'Icon_Playmat9.png', name: 'Playmat (Kyrone)_NAME.txt' },
        Lunight: { texture: 'T_PlayMat14.png', icon: 'Icon_Playmat14.png', name: 'Playmat (Lunight)_NAME.txt' },
        Tetramon: { texture: 'T_PlayMat8.png', icon: 'Icon_Playmat8.png', name: 'Playmat (Tetramon)_NAME.txt' },
        The_Four_Dragons: { texture: 'T_PlayMat4.png', icon: 'Icon_Playmat4.png', name: 'Playmat (The Four Dragons)_NAME.txt' },
        Water: { texture: 'T_PlayMat13.png', icon: 'Icon_Playmat13.png', name: 'Playmat (Water)_NAME.txt' },
        Wind: { texture: 'T_PlayMat12.png', icon: 'Icon_Playmat12.png', name: 'Playmat (Wind)_NAME.txt' },
        Wispo: { texture: 'T_PlayMat6.png', icon: 'Icon_Playmat6.png', name: 'Playmat (Wispo)_NAME.txt' },
        // Comics
        Comic1: { texture: 'T_Manga_1.png', icon: 'Icon_Manga1.png', name: 'Comic Vol 1_NAME.txt' },
        Comic2: { texture: 'T_Manga_2.png', icon: 'Icon_Manga2.png', name: 'Comic Vol 2_NAME.txt' },
        Comic3: { texture: 'T_Manga_3.png', icon: 'Icon_Manga3.png', name: 'Comic Vol 3_NAME.txt' },
        Comic4: { texture: 'T_Manga_4.png', icon: 'Icon_Manga4.png', name: 'Comic Vol 4_NAME.txt' },
        Comic5: { texture: 'T_Manga_5.png', icon: 'Icon_Manga5.png', name: 'Comic Vol 5_NAME.txt' },
        Comic6: { texture: 'T_Manga_6.png', icon: 'Icon_Manga6.png', name: 'Comic Vol 6_NAME.txt' },
        Comic7: { texture: 'T_Manga_7.png', icon: 'Icon_Manga7.png', name: 'Comic Vol 7_NAME.txt' },
        Comic8: { texture: 'T_Manga_8.png', icon: 'Icon_Manga8.png', name: 'Comic Vol 8_NAME.txt' },
        Comic9: { texture: 'T_Manga_9.png', icon: 'Icon_Manga9.png', name: 'Comic Vol 9_NAME.txt' },
        Comic10: { texture: 'T_Manga_10.png', icon: 'Icon_Manga10.png', name: 'Comic Vol 10_NAME.txt' },
        Comic11: { texture: 'T_Manga_11.png', icon: 'Icon_Manga11.png', name: 'Comic Vol 11_NAME.txt' },
        Comic12: { texture: 'T_Manga_12.png', icon: 'Icon_Manga12.png', name: 'Comic Vol 12_NAME.txt' },
    };

    // Create directories and add files to the zip for Mod 1
    if (modType1) {
        const selectedNames1 = modNames[modType1];

        if (category1 !== ('Playmats' || 'Comics')) {
            const objectsMesh1 = zip.folder('BepinEx/plugins/TextureReplacer/objects_meshes');
            objectsMesh1.file(selectedNames1.mesh, await readFile(meshFile1));
        }

        const objectsTextures1 = zip.folder('BepinEx/plugins/TextureReplacer/objects_textures');
        objectsTextures1.file(selectedNames1.texture, await readFile(textureFile1));
        objectsTextures1.file(selectedNames1.icon, await readFile(iconFile1));
        
        if (modType1 !== 'Dracunix_No_Name') {
            const objectsData1 = zip.folder('BepinEx/plugins/TextureReplacer/objects_data/figurines');
            objectsData1.file(selectedNames1.name, await readFile(nameFile1));
        }
    }

    // Create directories and add files to the zip for Mod 2
    if (modType2) {
        const selectedNames2 = modNames[modType2];

        if (modType2 !== ('Playmats' || 'Comics')) {
            const objectsMesh2 = zip.folder('BepinEx/plugins/TextureReplacer/objects_meshes');
            objectsMesh2.file(selectedNames2.mesh, await readFile(meshFile2))
        };

        const objectsTextures2 = zip.folder('BepinEx/plugins/TextureReplacer/objects_textures');
        objectsTextures2.file(selectedNames2.texture, await readFile(textureFile2));
        objectsTextures2.file(selectedNames2.icon, await readFile(iconFile2));

        if (modType2 !== 'Dracunix_No_Name') {
            const objectsData2 = zip.folder('BepinEx/plugins/TextureReplacer/objects_data/figurines');
            objectsData2.file(selectedNames2.name, await readFile(nameFile2));
        }
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
