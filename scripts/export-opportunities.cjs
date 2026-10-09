const fs=require('node:fs');const path=require('node:path');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
let html=fs.readFileSync(path.join(dist,'current-opportunities.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="opportunities.css?v=3.2">',()=>'<style>'+fs.readFileSync(path.join(dist,'opportunities.css'),'utf8')+'</style>');
for(const name of ['opportunities-d3.min.js','opportunities-data.js','opportunities.js'])html=html.replace('<script src="'+name+'?v=3.2"></script>',()=>'<script>'+fs.readFileSync(path.join(dist,name),'utf8').replace(/<\/script/gi,'<\\/script')+'</script>');
for(const name of ['unara-mark.svg','unara-favicon.svg'])html=html.replaceAll('"'+name+'"','"data:image/svg+xml;base64,'+fs.readFileSync(path.join(dist,name)).toString('base64')+'"');
html=html.replaceAll('href="index.html"','href="https://unara.mx/"').replace('</head>','<meta name="unara-review-version" content="v3-20261009"></head>');
const file=path.join(root,'docs/previews/Current_Opportunities_UNARA_v3.html');fs.writeFileSync(file,html);console.log(file);
