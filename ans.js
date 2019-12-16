const { exec, spawn } = require('child_process');
const fs = require("fs");

exports.createRG = function(id){  
    console.log("We try to create RG")
  exec('ansible-playbook createRG.yml --extra-vars "userId=' + id + '"', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
  })
}

exports.workVM = function(id,n){
    console.log("We try to create VM")
    exec('ansible-playbook createVM.yml --extra-vars "userId=' + id + '"', (err, stdout, stderr) => {
      if (err) {
          console.error(err);
          return;
      }
      let predIP = stdout.substr(stdout.indexOf("The public IP is") + 17,20)
      let postIP = findIP.substr(0,findIP.indexOf('"')-1)
      fs.writeFileSync('/home/site/repository/hosts.' + id, '[dev]\n' + postIP + '\n\n[dev:vars]\nansible_user=azureuser\nansible_ssh_common_args="-o StrictHostKeyChecking=no"\nansible_ssh_private_key_file=/home/site/repository/.ssh/id_rsa"')
      console.log(stdout)
      console.log("We try to start VM")
      exec('ansible-playbook workVM.yml --extra-vars "number=' + n  + ' userId=' + id +'"   -i hosts.' + id, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(stdout);
          console.log("We try to delete VM")
          exec('ansible-playbook deleteVM.yml --extra-vars "userId=' + id + '"', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
          })
      })
  })