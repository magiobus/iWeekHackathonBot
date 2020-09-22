module.exports = {
    name: 'roles',
    description: "Muestra los roles del server junto con su id",
    execute(msg,bot,args){
      let roles = "Roles del server con su ID \n \n"
      msg.guild.roles.cache.forEach((role) => {
          roles += `${role.name} => ${role.id} \n`
      });

      msg.channel.send(roles);
    }
}
