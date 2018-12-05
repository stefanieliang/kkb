module.exports = (sequelize,Types)=>{
  const OpenCourse = sequelize.define('OpenCourse',{
      name:Types.STRING(50),
      description:Types.STRING(100),
      time:Types.DATE,
      count:Types.INTEGER,
      poster:Types.STRING(100)
  },{
      tableName:'open_course',//确认表名
      timestamps:false,//禁止seq自动添加createAt,updatedAt
  });
    OpenCourse.sync();
    return OpenCourse;
};