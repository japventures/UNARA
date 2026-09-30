const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../dist');let count=0;
for(const name of fs.readdirSync(root)) {
 const file=path.join(root,name);
 if(name.endsWith('.js')) execFileSync(process.execPath,['--check',file]);
 if(!name.endsWith('.html')) continue;
 const html=fs.readFileSync(file,'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const url=match[1];if(/^(https?:|data:|mailto:|tel:)/.test(url))continue;
  const [location,hash]=url.split('#');let target=path.resolve(root,location.split('?')[0].replace(/^\//,'')||name);
  if(location==='/' || location==='')target=path.join(root,location==='/'?'index.html':name);
  if(!path.extname(target))target+='.html';
  if(!fs.existsSync(target))throw Error(`${name}: recurso ausente ${url}`);
  if(hash && target.endsWith('.html') && !/presentacion/.test(target)) {
   const source=fs.readFileSync(target,'utf8');if(!source.includes(`id="${hash}"`))throw Error(`${name}: ancla ausente ${url}`);
  }
  count++;
 }
}
console.log(`${count} referencias locales verificadas; sintaxis JS válida.`);
