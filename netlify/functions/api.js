const fetch = require("node-fetch");

exports.handler = async function(event, context){
  //정보를 요청할 url을 만드는 부분
  const apiKey = process.env.YT_API_KEY; //Netlify 환경 변수
  const ChannelLinkList = [
    "UCWUw4ganTwhyRG-r611fNog", //팜나무
    "UCu6RBcAV9AbW8jGSkJ9Lhxw", //ClockFire
    "UCSARCoEeNKJdOmkGASvyGlg", //맥동전파원
    "UCdujsu5KOGgZx15VYL0MKug", //행성상성운
    "UCSJpfzHt9gaEsA171Oa_QXA", //BMI KINGDOM
    "UCszG3wtq2_qwMDJBXHuRw8w", //Escape
    "UCkz04S8Zov4OyYRpJLtvj5g" //Entire
  ]; //채널 아이디를 모은 리스트

  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ChannelLinkList.join(",")}&key=${apiKey}`;
  let OrderedChannelList = [];

  try{
    const ChannelDataSourse = await fetch(url); //받아온 채널 정보를 저장
    const ChannelData = await ChannelDataSourse.json(); //파일의 형식을 변환

    OrderedChannelList = ChannelLinkList.map(function(id){
      return ChannelData.items.find(function(item){
        return item.id === id;
      });
    }); //ChannelData의 요소를 ChannelLinkList의 순서에 맞춘다
  }catch(error){
    console.error("API 요청 실패:", error);
    return{
      statusCode: 500,
      body: JSON.stringify({ error: "유튜브 API 요청 실패" })
    };
  };

  return{
    statusCode: 200,
    body: JSON.stringify(OrderedChannelList)
  };
};