



//!!!!!!!   222666 ister ve ssskkooor ttaabbllossuu olmmadaan önceki hali
import NetInfo from '@react-native-community/netinfo';
import React, { useState,useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet, TextInput,TouchableOpacity ,SafeAreaView,Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,useNavigation ,CommonActions} from '@react-navigation/native'; 
//firestore kayıt işlemleri felan
//firestore kısmı
import { initializeApp } from 'firebase/app';
//words .txt okumak için
import words from './words.js';

import { captureScreen } from 'react-native-view-shot';


import { getFirestore, collection, addDoc ,doc,setDoc,getDoc,getDocs,query,where,deleteDoc,updateDoc} from 'firebase/firestore'; // Firestore fonksiyonlarını içe aktarın
//username globalde alma
global.kullanicisifre="0"//sifre yok demek
//kayıt olma işleminde documentid
global.kullanicidocumentid=0
//eslesme kısmında ekleme kontrolü için 
global.ekle=0;
//!!!!!!1   Macla ilgili işlemler
//maca gireceği kanal 4,42,56 gibi
global.mackanal=0;
//kaybetme kazanmada birden fazla alert olmasın diye kontrol
global.winkontrol=0;

//hata  length çözüm
global.errorlength=0;
//benim eğer ikiisde kazanamazsa bakacağım puanım
global.puan=-1;
const firebaseConfig = {
  apiKey: "AIzaSyDEbei1rmDvuPwzKsNsSEwJJCFTa87tNY4",
  projectId: "zamankisitsizapp2",
  storageBucket:  "zamankisitsizapp2.appspot.com"
}

const app =initializeApp(firebaseConfig);

const db = getFirestore(app);


//----------------------------------


const Stack = createStackNavigator();

const GirisEkrani = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/Wordanaekran.jpg')} style={styles.image} />
      <Text style={styles.title}>Uygulama Adı</Text>
      <View style={styles.buttonContainer}>
        <Button title="Üye Ol" onPress={() => navigation.navigate('KayıtOl')} />
        <Button title="Giriş Yap" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};



const Oyunsecimpage = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Oyun Türlerini Seçin</Text>
      <Text style={styles.oyunSecimi}> 
         <View style={styles.buttonContainer}>
        <Button title="Rastgele Harf Sabiti" onPress={() => navigation.navigate('RastgeleHarf')} />

        <Button title="Harf Sabiti Kısıtlamasız" onPress={() => navigation.navigate('HarfKisitlamasizOyun')} />
      </View>
      </Text>
    </View>
  );
};

global.globalharf="0";//0 ise harf  kısıtlamasız
const RastgeleHarfpage = ({navigation}) => {
  const turkceKarakterler = "abcçdefgğhıijklmnoprsştuüvyz";
  const rastgeleKarakter = turkceKarakterler[Math.floor(Math.random() * turkceKarakterler.length)];
  global.globalharf=rastgeleKarakter+"";
  console.log("rastgele harf uretme:"+global.globalharf)
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Kanal Türünüzü Seçin</Text>
      <View style={styles.buttonContainer}>
        <Button title="Kanal 4" onPress={() => navigation.navigate('kanal4')} />
        <Button title="Kanal 5" onPress={() => navigation.navigate('kanal5')} />
        <Button title="Kanal 6" onPress={() => navigation.navigate('kanal6')} />
        <Button title="Kanal 7" onPress={() => navigation.navigate('kanal7')} />
      </View>
      <Text style={styles.oyunSecimi}>{rastgeleKarakter}</Text>
    </View>
  );
};
const HarfKisitlamasizOyunpage = ({navigation}) => {
global.globalharf="0"
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Kanal Türünüzü Seçin</Text>
      <Text style={styles.oyunSecimi}> 
        <Button title="Kanal 4" onPress={() => navigation.navigate('kanal42')} />
        <Button title="Kanal 5" onPress={() => navigation.navigate('kanal52')} />
        <Button title="Kanal 6" onPress={() => navigation.navigate('kanal62')} />
        <Button title="Kanal 7" onPress={() => navigation.navigate('kanal72')} />
         
     
      </Text>
    </View>
  );
};




const MacalanScreen = ({ route, navigation }) => {

  const { sordugukelime, kelimegirdimi } = route.params;

  useEffect(() => { const macCollection = collection(db, "macalan");
   
 
 
 
 
 
 
 
 
    const docRef = doc(macCollection, global.kullanicisifre);
    const data = {
      sifre: global.kullanicisifre,
      KelimeGirdimi: true,
      Sordugukelime: (sordugukelime.toUpperCase()),
      Kazanma:0
    };

    setDoc(docRef, data)
      .then(() => {
        console.log("Belge başarıyla eklendi.");
        //!burada 
global.errorlength=1;
      })
      .catch((error) => {
        console.error("Belge eklenirken bir hata oluştu:", error);
      });

    const yonlen = "kanal" + global.mackanal;
    navigation.navigate(yonlen); 
    
    
    
  }, []); // useEffect'in bağımlılıkları boş diziyle belirtilerek sadece bir kez çalışması sağlanır

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Yönlendirilen Sayfa</Text>
      <Text>sordugukelime: {sordugukelime}</Text>
      <Text>kelimegirdimi: {kelimegirdimi.toString()}</Text>
    </View>
  );

};





//yonlendirme için ayrı fonksiyon
const navigateToSorfunction = (navigation, param1, param2) => {
  navigation.push('sorfunction', {
    param1,
    param2
  });
};



//??                                kelimeyi alma

const Sorkelime = ({ route,navigation}) => {



//kelime sorma ekranına gelen kişi zaten maç yapacaktır




  const param1 = route.params.param1;
  const param2 = route.params.param2;
  console.log("sor function+++++++++++++++++")
  console.log(`param1: ${param1}`);
  console.log(`param2: ${param2}`);
  const [countdown, setCountdown] = useState(20); // Geri sayım için başlangıç süresi
  const [timerRunning, setTimerRunning] = useState(false); // Zamanlayıcının çalışıp çalışmadığını belirleyen durum
  const [satirSayisi, setSatirSayisi] = useState(param1); 
  const [harfler, setHarfler] = useState([]); // Girilen harfleri saklamak için
  const [kelime, setKelime] = useState(''); // Oluşturulan kelimeyi saklamak için
  const ilkHarf = param2.toUpperCase(); // param2'nin büyük harf versiyonunu al
  // İlk hücrenin değerini ilkHarf olarak atayın
  const [guide, setGuide] = useState(Array(satirSayisi).fill('')); // Hücre guide'larını saklamak için
  const [buttonPressed, setButtonPressed] = useState(false); // butona tıklanma(yani kullanıcı 60 sn kelime girdimi kontrol)
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (countdown === 0) {
   


      if(buttonPressed===false)
         { 
          const macCollection = collection(db, "macalan");
          const docRef = doc(macCollection, global.kullanicisifre); // Belirtilen documentID'ye sahip belgeyi referans alır
          const data = {sifre:global.kullanicisifre,KelimeGirdimi:false,Sordugukelime:"yok",Kazanma:0}; // Eklemek istediğiniz veri
          
          setDoc(docRef, data)
            .then(() => {
              console.log("Belge başarıyla eklendi.");
              //burada mac alanda KelimeGirdimi:false değerine  göre tekrardan kelime sorgu ekranınnı çağırma
              global.errorlength=1;

              const macCollectionRef = collection(db, "macalan");
              let kazanansifre="";
              const countDocumentsWithKelimeGirdimiFalse = async () => {
                let counter = 0;
             
                const querySnapshot = await getDocs(macCollectionRef);
                querySnapshot.forEach(doc => {
                  const kelimeGirdimi = doc.data().KelimeGirdimi;
                  if (kelimeGirdimi === false) {
                    counter++;
                  }
//kelime giren varsa kazandı
if(kelimeGirdimi===true)
{
kazanansifre=doc.data().sifre;
}


                });
                
                return counter;
              };
              
              countDocumentsWithKelimeGirdimiFalse()
                .then(count => {
                  console.log("KelimeGirdimi değeri false olan belge sayısı:", count);
                  if(count==2)
                  {//!!bu kısıma bak olmadı
                    navigateToSorfunction(navigation, route.params.param1, route.params.param2);
                   
Alert.alert("ikiside veri girmedi");
                  }
                  else if(count==1 && (kazanansifre.length>0))
                  {
Alert.alert("biri veri girmemisse KelimeGirdimi true olan kazandı ")
if((global.kullanicisifre+"")===kazanansifre)
{
  Alert.alert("kazandın");
}else
{
  Alert.alert("kaybettin");
}

                  }
                })
                .catch(error => {
                  console.error("Belge sayısını alırken hata oluştu:", error);
                });
//!!!!!!!!!!!!!!!!!!!














            })
            .catch((error) => {
              console.error("Belge eklenirken bir hata oluştu:", error);
            });
          
         }
      
      setTimerRunning(false);
      setCountdown(20);
    }
  }, [countdown]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  const harfGirisi = (text, index) => {
    const yeniHarfler = [...harfler];
    yeniHarfler[index] = text;
    setHarfler(yeniHarfler);
    
    if (yeniHarfler.length === satirSayisi) {
      const olusturulanKelime = yeniHarfler.join('');
      if (olusturulanKelime.length !== satirSayisi) {
        const yenikelime = [];
        for (let i = 0; i < olusturulanKelime.length + 1; i++) {
          if (i === 0) {
            yenikelime[0] = ilkHarf;
          } else {
            yenikelime[i] = olusturulanKelime[i - 1];
          }
        }
        setKelime(yenikelime.join(''));
      } else {
        setKelime(olusturulanKelime);
      }
    }

    if (ilkHarf !== 0 && index === 0) {
      const yeniGuide = [...guide];
      yeniGuide[index] = ilkHarf;
      setGuide(yeniGuide);
    }
  };




  const handleStartTimer = () => {
    setTimerRunning(true);
  };



  return (
    <View style={styles.container}>
      <View style={styles.satir}>
        {ilkHarf !== "0" && (
          <Text style={styles.hucreText}>{ilkHarf}</Text>
        )}
        <TextInput
          style={styles.hucre}
          onChangeText={(text) => harfGirisi(text, 0)}
          maxLength={1}
          value={ilkHarf !== "0" ? ilkHarf : ''}
        />
        {Array(satirSayisi - 1)
          .fill()
          .map((_, i) => (
            <TextInput
              key={i + 1}
              style={styles.hucre}
              onChangeText={(text) => harfGirisi(text, i + 1)}
              maxLength={1}
              value={harfler[i + 1] || ''}
            />
          ))}
      </View >
      <Text  style={styles.countdown}>{countdown} saniye</Text>
      <Text style={styles.kelime}>{kelime}</Text>
     
<Button
  title="Button 1"
  onPress={() => {
    Alert.alert('Uyarı', `${global.mackanal} kanalında maç yapılacak`);
    setButtonPressed(true); // Buton basıldığında durum değişkenini true olarak güncelle
    
    navigation.navigate('Macalan', { sordugukelime: kelime.toUpperCase(), kelimegirdimi: true })//butona basıldıysa bir kelime ğirmiştir
  }}
/>

      </View>
  );
};


//!!!!!!!!!!!!!!!!!   bu kısım  duelloda yeni soru kelimeler olusturmak için








//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ESLESME GPTTAT


//!!!!   kullanıcı kanala kayıt+eslesme ekranı
const  Eslesme = ({ route }) => {
   const navigation = useNavigation(); // useNavigation kancasını burada çağırın

    
  const kanaltip = route.params.param1;
  const kullaniciid = route.params.param2;
  const [kontrol, setKontrol] = useState(0);
  const [dictionary, setDictionary] = useState({});
  const [kanaldictionary,setKanaldictionary]=useState({});
  useEffect(() => {
   
    const fetchData = async () => {
      const usersCollection = collection(db, "kanallar");
      const hangikanal = "kanal" + kanaltip;
      const kanalDocRef = doc(usersCollection, hangikanal);
      const belgeRef = doc(usersCollection, hangikanal);

      try {
        const belgeSnapshot = await getDoc(belgeRef);
        if (belgeSnapshot.exists()) {
          const belgeVerisi = belgeSnapshot.data();

          setKanaldictionary(belgeVerisi)
     
//!!!!!!!!!!!!!!!!!!!!!    burada istek gönderme varmı kontrol et

const showConfirmation = () => {
  // Kullanıcıya onay iletişim kutusu göster
  Alert.alert(
    "Maç eşleşme isteğiniz",
    "Kabul ediyor musunuz?",
    [
      {
        text: "Hayır",
        onPress: () => handleNo(),
        style: "cancel"
      },
      { text: "Evet", onPress: () => handleYes() }
    ]
  );
};

const handleYes = () => {


  console.log("Evet'e tıklandı!");
  // Evet'e tıklanınca  durum 2 yap oyunda diye
  Object.values(belgeVerisi).forEach(item => {
    // İlgili dizinin 1. elemanı 1 ise, 0. elemanını ekrana bas
    if (item[0] === global.kullanicisifre) {
      item[1]=2;
    }
  });

  setDoc(kanalDocRef, belgeVerisi);

//hendle yes dedimi  macalan kayıt yapma
global.mackanal=kanaltip;

//harf sabiti olmayanın kanal boyunu ayarlama
sorboy=kanaltip;
if(kanaltip===42)
{
  sorboy=4;
}
if(kanaltip===52)
{
  sorboy=5;
}
if(kanaltip===62)
{
  sorboy=6;
}if(kanaltip===72)
{
  sorboy=7;
}

//!!                  burada kullanıcıyı mac alan ekle kendi idsi ile
const macCollection = collection(db, "macalan");
const docRef = doc(macCollection, kullaniciid);
const data = { sifre: kullaniciid };

setDoc(docRef, data)
  .then(() => {
    console.log("Belge başarıyla eklendi.");
  })
  .catch((error) => {
    console.error("Belge eklenirken bir hata oluştu:", error);
  });

//!!!!burada diğer navigation silmeye calistim reset ile
  //burada kelime sorma ekranına yönlendirme
  //yonlendirme
 
// sorfunction ekranını açtıktan sonra
navigation.navigate('sorfunction', {
  param1: sorboy, // Bu parametrelerin değerlerini uygun şekilde ayarlayın
  param2: global.globalharf
})







};

const handleNo = () => {
  console.log("Hayır'a tıklandı!");
  // Hayır'a tıklanıncadurumu 0 yap aktif diye
 
  Object.values(belgeVerisi).forEach(item => {
    // İlgili dizinin 1. elemanı 1 ise, 0. elemanını ekrana bas
    if (item[0] === global.kullanicisifre) {
      item[1]=0;
    }
  });

  setDoc(kanalDocRef, belgeVerisi);


};




//!!!!!!!!!!!!!!!!!!!!!!!!!!
  // belgeVerisi'nin values dizisini al ve koşula göre işlem yap
  Object.values(belgeVerisi).forEach(item => {
    // İlgili dizinin 1. elemanı 1 ise, 0. elemanını ekrana bas
    if (item[1] === 1) {
      console.log("belgeverisinin elemanın 0. elemanı:", item[0]);
      if(item[0]===global.kullanicisifre)
      {
        
// Onay iletişim kutusunu göster
showConfirmation();
      }
    }
  });











     console.log(typeof(global.kullanicisifre));
const yeniVeri = {};
for (const key in belgeVerisi) {
  if (belgeVerisi.hasOwnProperty(key)) {
    if (belgeVerisi[key][0] !==  global.kullanicisifre) {
      yeniVeri[key] = belgeVerisi[key];
    }
  }
}
          console.log("belgeVerisi"+belgeVerisi)
     
        
        
          setDictionary(yeniVeri);
          setKontrol(1);

        } else {
          console.log('Belge bulunamadı.');
        }
      } catch (error) {
        console.error('Belge alınırken bir hata oluştu:', error);
      }

      try {
        // Ekle değişkeni global olarak kontrol edilir ve eğer 0 ise devam edilir
        if (global.ekle === 0) {
          global.ekle = 1;

          // Tüm alan adlarını al ve diğer işlemleri yap...
          getDoc(kanalDocRef).then((docSnapshot) => {
            console.log("girdi");
            console.log(docSnapshot.exists)
            if (docSnapshot.exists) {
              const data = docSnapshot.data();
              const fieldNames = Object.keys(data);
              const stringDizi = [];

              // Alan adlarını string diziye ekle
              for (let i = 0; i < fieldNames.length; i++) {
                stringDizi.push(fieldNames[i]);
              }

              // String diziyi int'e dönüştür
              const intDizi = stringDizi.map((str) => parseInt(str, 10));

              // İnt dizisini büyükten küçüğe sırala
              for (let i = 0; i < intDizi.length - 1; i++) {
                for (let j = i + 1; j < intDizi.length; j++) {
                  if (intDizi[i] < intDizi[j]) {
                    const temp = intDizi[i];
                    intDizi[i] = intDizi[j];
                    intDizi[j] = temp;
                  }
                }
              }

              console.log("==================================>>>>>>>>>>>>>>>>>>intdizi:"+intDizi);

              if (intDizi.length === 0) {
                // Kayıtlı kişiler yoksa
                setDoc(kanalDocRef, {
                  "0": [kullaniciid, 0]
                }, { merge: true });
                setKontrol(1);
              } else {

              //!!!!eğer int dizimin 0,1,2 şeylerin içine gir eğer  0 elemanı global.kullanicisifre eşit ise
    



// Promise.all() ile tüm asenkron işlemleri bir araya getirme
const promises = [];

for (let q = 0; q < intDizi.length; q++) {
  // Kanal belgesini alıp belirli bir alanı kontrol etme
  const promise = getDoc(kanalDocRef)
    .then((kanalDocSnap) => {
      if (kanalDocSnap.exists()) {
        const data = kanalDocSnap.data();
        if (data.hasOwnProperty(intDizi[q])) {
          const fieldValue = data[intDizi[q]];
          if (Array.isArray(fieldValue) && fieldValue.length > 0 && fieldValue[0] === global.kullanicisifre) {
            console.log("intdizi[q] field alanı bir dizi ve dizinin 0. elemanı global kullanıcı şifresiyle eşleşiyor.");
            //!!!burda birledim
            fieldValue[1] = 0; // Dizinin ikinci elemanını 1 yap
            let fieldne = intDizi[q];
            return updateDoc(kanalDocRef, { [fieldne]: fieldValue })
              .then(() => {
                console.log("intdizi[q] field alanının 1. elemanı 0 olarak güncellendi.");
                return true; // Başarıyla tamamlandı bilgisini döndür
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu:", error);
                return false; // Hata durumunda false döndür
              });
          } else {
            console.log("intdizi[q] field alanı bir dizi değil veya dizinin 0. elemanı global kullanıcı şifresiyle eşleşmiyor.");
            return false; // Başarısız durumu döndür
          }
        } else {
          console.log("int dizi[q] field alanı belgede bulunmamaktadır.");
          return false; // Başarısız durumu döndür
        }
      } else {
        console.log("Belge bulunamadı int dizi[q].");
        return false; // Başarısız durumu döndür
      }
    })
    .catch((error) => {
      console.error("Belge alınırken bir hata oluştu: int dizi [q]", error);
      return false; // Başarısız durumu döndür
    });

  promises.push(promise);
}

Promise.all(promises)
  .then((results) => {
    // Tüm işlemler tamamlandığında bu blok çalışır
    const elemanVarsa = results.some(result => result === true);
    if (!elemanVarsa) {
      // Eleman yoksa yapılacak işlem
   // Kayıtlı kişiler varsa
   for (let k = 0; k < intDizi.length; k++) {
    console.log(intDizi[k])
  }

  sonkisi = intDizi[0] + 1; // 10 ise 11 yap


//burada eğer ekleyeceğmiz kişi varsa onun üstüne ekle

console.log("sonkisi:"+sonkisi)


  // Eğer sonkisi 5'ten küçük veya eşitse devam et
  if (sonkisi <= 5) {
    setDoc(kanalDocRef, {
      [sonkisi.toString()]: [kullaniciid, 0]
    }, { merge: true });
  } 
    else {
    console.log("5 ten fazla kişi girdi");
  }








    }
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });









      
                
                
                
                
                
                
                
              
             
             
              }

            } else {
              console.log("Doküman bulunamadı!");
            }
          });
        }
        console.log("oldu");
      } catch (error) {
        console.error('kanala kişi eklemede hata var', error);
      }
    };




    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);

  const renderButtons = () => {
    // Dictionary'nin içeriğine göre butonlar oluşturulur
    return Object.keys(dictionary).map((key) => {
      const item = dictionary[key];
      console.log("dictionary[key]"+dictionary[key])
      console.log("dictionary"+dictionary);
      return (
        <TouchableOpacity
          key={key}
          style={styles.button}
          onPress={() => handleButtonPress(item)}
        >
        <Text style={styles.buttonText}>{item[0] + "  NOLU OYUNCU ve aktiflik durumu:"+ item[1]}</Text>
</TouchableOpacity>
      );
    });
  };

  const handleButtonPress = (item) => {
    console.log("Butona basıldı:", item);
  //kullanıcı istek atma olayı
  console.log("sifre kısmı:"+item[0]);
    const usersCollection2 = collection(db, "kanallar");
    const hangikanal2 = "kanal" + kanaltip;
    const kanalDocRef2 = doc(usersCollection2, hangikanal2);
   // Kanal belgesini referans aldık ve belgedeki verileri almak için get() fonksiyonunu kullandık.
   // Eğer global.kullanicisifreme eşit olan elemanın ikinci değeri 1 olacaksa:
const kullanicisifremmi = item[0]; // global.kullanicisifre'nin tanımlı olduğunu varsayalım

Object.values(kanaldictionary).forEach(item => {
    if (item[0] === kullanicisifremmi) {
        item[1] = 1;
    }
});

// Şimdi güncellenmiş veriyi kanalDocRef2'ye yazabilirsiniz:
setDoc(kanalDocRef2, kanaldictionary);





  };

  return (
    <View>
      <Text>ESLESME EKRANI</Text>
      {renderButtons()}
    </View>
  );
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ESLESME GPTTAT


//!!!!   kullanıcı kanala kayıt+eslesme ekranı
const Duello = ({ route ,navigation}) => {



console.log("duello")
  const [rakipsifreler, setRakipSifreler] = useState([]); 
   const [confirmationShown, setConfirmationShown] = useState(false);
 
  const kanaltip = route.params.param1;
  const kullaniciid = route.params.param2;
  
  // macalanındaki rakibe istek atma
  const macCollection = collection(db, "macalan");


//ONAY İLETİSİM KUTUSU 


const showConfirmation = () => {
  // Kullanıcıya onay iletişim kutusu göster
  Alert.alert(
    "Maç eşleşme isteğiniz",
    "Kabul ediyor musunuz?",
    [
      {
        text: "Hayır",
        onPress: () => handleNo(),
        style: "cancel"
      },
      { text: "Evet", onPress: () => handleYes() }
    ]
  );
};

const handleYes = () => {



for(let x=0;x<rakipsifreler.length;x++)
{
//mac collection kullanıcıyı ekleme
const docRef = doc(macCollection, rakipsifreler[x]);
const data = { sifre: rakipsifreler[x] };

setDoc(docRef, data)
  .then(() => {
    console.log("Belge başarıyla eklendi.");
  })
  .catch((error) => {
    console.error("Belge eklenirken bir hata oluştu:", error);
  });


}





for(let y=0;y<rakipsifreler.length;y++)
{
console.log("----->"+rakipsifreler[y])
//harf sabiti olmayanın kanal boyunu ayarlama
sorboy=global.mackanal;
if(sorboy===42)
{
  sorboy=4;
}
if(sorboy===52)
{
  sorboy=5;
}
if(sorboy===62)
{
  sorboy=6;
}if(sorboy===72)
{
  sorboy=7;
}


if(global.kullanicisifre===rakipsifreler[y])
{
  //burada kelime sorma ekranına yönlendirme
  //yonlendirme
// sorfunction ekranını açtıktan sonra
// Ekranı sıfırlamak için reset fonksiyonunu kullanma
navigation.reset({
  index: 0,
  routes: [{ name: 'sorfunction', params: { param1: sorboy, param2: global.globalharf } }],
});



}
  


} 


};

const handleNo = () => {
  console.log("Hayır'a tıklandı!");
  // Hayır'a tıklanıncadurumu 0 yap aktif diye


};











  // macCollection koleksiyonundaki bütün belgeleri al
  getDocs(macCollection)
    .then((querySnapshot) => {
      const sifreler = [];

      // Her bir belge için
      querySnapshot.forEach((doc) => {
        // Belgenin verilerini al
        const data = doc.data();
        // Eğer belgede 'sifre' alanı varsa ve değeri null veya undefined değilse,
        // sifreler dizisine ekle
        if (data.hasOwnProperty('sifre') && data.sifre !== null && data.sifre !== undefined) {
          sifreler.push(data.sifre);
        }
      });

      // Tüm sifreleri içeren sifreler dizisini kullan
      console.log("sifreler:", sifreler);

      
      setRakipSifreler(sifreler);

// Durum değişkenini kontrol ederek showConfirmation fonksiyonunu çağırma
if (!confirmationShown) {
  showConfirmation();
  setConfirmationShown(true);
}
      
    })
    .catch((error) => {
      console.error("Belgeler alınırken bir hata oluştu DUELLO KISMI:", error);
    });










};


//!!!!!!!!!! RAKİBİN EKRANINI GORME SCREEN KISMI


const  Rakipgormescreen =({ route, navigation }) => {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    takeScreenshotAndSave();
     Rakipgor();
  }, []); // Boş bağımlılık dizisi, yalnızca bileşen yüklendiğinde çalışmasını sağlar

  const takeScreenshotAndSave = async () => {
    try {
      const uri = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      });

      // Ekran görüntüsünü kaydet
      await setDoc(doc(db, 'screenshots', global.kullanicisifre), {
        url: uri,
      });

      

      Alert.alert('Ekran görüntüsü başarıyla kaydedildi.');
    } catch (error) {
      console.error('Ekran görüntüsü alınamadı:', error);
      Alert.alert('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  const Rakipgor = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'screenshots'));
      const ids = querySnapshot.docs.map(doc => doc.id);

      for (let x = 0; x < ids.length; x++) {

      console.log("tipi ids[x]:"+typeof(ids[x]))

        if (ids[x] !== global.kullanicisifre) {
          console.log("ekran goruntusu veren kullaniici sifre:"+ids[x])

          const docSnap = await getDoc(doc(db, 'screenshots', ids[x]));
          const url = docSnap.data().url;
          console.log("++++++++++++++++++++url"+url);
          setImageUrl(url);
          console.log("İİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİİimageurl"+imageUrl);
          break;
        }
      }
    } catch (error) {
      console.error('Error fetching document IDs:', error);
    }
  };

  const Rakipekransilme = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'screenshots'));
      const ids = querySnapshot.docs.map(doc => doc.id);

      for (let y = 0; y < ids.length; y++) {
        if (ids[y] !== global.kullanicisifre) {
          await deleteDoc(doc(db, 'screenshots', ids[y]));
          console.log('RAKİP EKRAN GORUNTUSU deleted successfully');
        }
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="RAKİP_GÖR" onPress={Rakipgor} />
      <Button title="RAKİP_GÖRMEME" onPress={Rakipekransilme} />

      <View>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};




























const Kanal4page = ({navigation}) => {

  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

  useEffect(() => {
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        setInternetDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    };

    const handleConnectionChange = (state) => {
      if (!state.isConnected) {
        Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
        startCountdown();
      } else if (state.isConnected && vakitdolumu === 1) {
        setInternetDown(10);
        Alert.alert('Uyarılan kişi mağlup sayıldı!');
        updateFilteredDocuments();
      }
    };

    const updateFilteredDocuments = async () => {
      try {
        const macCollection = collection(db, "macalan");
        const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
        const querySnapshot = await getDocs(filteredDocsQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { Kazanma: 1 });
        });
        console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
      } catch (error) {
        console.error('Belgeleri güncellerken hata:', error);
        Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      setVakitDolumu(0);
      setInternetDown(10);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, [vakitdolumu]);

  useEffect(() => {
    if (internetdown === 0) {
      setVakitDolumu(1);
    }
  }, [internetdown]);










  const [tahminbuttonbas, setTahminButtonBas] = useState(0);
  const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
  const [timeleft, setTimeleft] = useState(60);
  console.log("kanal4 page");
  //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
  //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
  //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
  //başlaılacaktır
 
  
   
  useEffect(() => {
    let interval;
    let countdownInterval;
    
    const startTimer = () => {
      console.log("****" + tahminbuttonbas);
    
      interval = setInterval(() => {
        if (tahminbuttonbas === 1 && timeleft !== 60) {
          setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
          setTahminButtonBas(0);
        }
      
        setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
        console.log("timeleft"+timeleft);
        if (timeleft === 0) {
          
          if (tahminbuttonbas !== 0) {
            console.log('Süre doldu ve tahmin butonuna basıldı.');
            setTimeleft(60);
            setTahminButtonBas(0);
            // Burada istediğiniz işlemleri yapabilirsiniz
          } else {
            console.log('Süre doldu ancak tahmin butonuna basılmadı.');
            // Burada istediğiniz işlemleri yapabilirsiniz
            alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
            startCountdown(); // Geri sayım fonksiyonunu başlat
          }    
          
         
        }
      }, 1000);
    };
    
    const startCountdown = () => {
      console.log("countdown başlatılıyor");
      let countdownValue = 10; // Başlangıçta 10 saniye
      const countdownInterval = setInterval(() => {
        if (countdownValue === 0) {
          clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
          // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
          alert('Süre doldu ve hala tahmin yapılmadı.');
          console.log("kim silinecek" + global.kullanicisifre);
          // Macalan oyuncuyu silme kısmı
          const macKoleksiyon = collection(db, "macalan");
          const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
          deleteDoc(docRef)
            .then(() => {
              console.log("Belge sayaç macalan başarıyla silindi.");
              setCountdown(10);
              setTimeleft(60);
              setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
            })
            .catch((error) => {
              console.error("Belge silinirken bir hata oluştu: ", error);
            });
        } else {
          setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
          countdownValue--;
        }
      }, 1000);
    };
  

    startTimer();
    
    // useEffect temizleyici fonksiyon
    return () => {
      clearInterval(interval);
     
    };
    }, [tahminbuttonbas,timeleft,countdown]); // tahminbuttonbas değiştiğinde yeniden etkinleştir
    
  
  
  
  
  
  
  
  const [globalrakipkelime, setGlobalRakipKelime] = useState("");
  
    //RENKLENDİRME İŞLEMLERİ
      // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
      const [secretWord, setSecretWord] = useState('');
      const [guessWord, setGuessWord] = useState('');
    
      // Tahmin geçmişini ve harf renklerini takip edin
      const [guesses, setGuesses] = useState([]);
      const [colors, setColors] = useState([]);
 
    
    
    
    
    
      //kelime listesi
    const  [listeKelimeler,setlistekelimeler]=useState([]);
    //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
    useEffect(() => {
      if (globalrakipkelime.length > 0) {
        setSecretWord(globalrakipkelime);
      }
    }, [globalrakipkelime]);
    
  
    //burada secret word mac eslesme alanından almaişlemleri
    // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
    //rakibin kelimesini alma işlemi
  useEffect(() => {
    // setInterval ile belirli aralıklarla işlem yapılacak
    const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
  
        try {
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("Belge bulunamadı.");
          } else{
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sordugukelime = data.Sordugukelime;
               if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
               {
               
                   console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                   setGlobalRakipKelime(sordugukelime);
           //        console("1111111:"+globalrakipkelime);
   
       }
                  });
          }
  
            
  
  
  
  
  
        } catch (error) {
            console.error("Error getting documents1: ", error);
        }
    }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
     // Component unmount edildiğinde interval'i temizle
     return () => clearInterval(interval);
    }, []); 
    
      //!!---------------------------------------------------*
  
      //burda bir saniyede bir kaybettimi kontrol et
  useEffect(() => {
    const interval = setInterval(async () => {
      const macKoleksiyon = collection(db, "macalan");
      const q = query(macKoleksiyon, where("Kazanma", "==", 1));
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (querySnapshot.empty) {
            console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
        } else{
         
          console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
          if(global.winkontrol==0)
          {global.winkontrol=global.winkontrol+1;
           if((global.kullanicisifre+"")===(doc.id+""))
            {
              alert("Kazandın");
            }   
            else{
              alert("Kaybettin");
            } 
          } 
  
        }
  
          
          
        });
      } catch (error) {
        console.error("Error getting documents2: ", error);
      }
    }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
  
    // Interval'i temizleme
    return () => clearInterval(interval);
  }, []);
  
    //deneme kelime listesini
    //!! kelime listesi ekleme isi
    
    useEffect(() => {
      const islenenKelimeler = words.split('\n');
      setlistekelimeler(islenenKelimeler);
    }, []);
    
    
    const handleGuess = () => {
  
    
    //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
  
    function checkMatch(word, list) {
      return list.some(item => word.localeCompare(item) === 0);
  }
  //listedeki tum harfleri buyut
  const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
  
  const result = checkMatch(guessWord, capitalizedWords);
  console.log(result);
  if(result==false)
  {
    alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
  }
  
  
  
   
    
      const newGuess = guessWord.toUpperCase();
      const newColors = [];
  
      for (let i = 0; i < secretWord.length; i++) {
        const secretChar = secretWord[i];
        const guessChar = newGuess[i];
  console.log("guesschar:"+guessChar)
  console.log("secretchar:"+secretChar)
        if (secretChar === guessChar) {
          newColors.push('green');
        } else if (secretWord.includes(guessChar)) {
          newColors.push('yellow');
        } else {
          newColors.push('gray');
        }
      }
  
      setGuesses([...guesses, newGuess]);
      setColors([...colors, newColors]);
  
      if (newGuess === secretWord) {
        alert('Tebrikler! Kazandınız!');
        global.winkontrol=global.winkontrol+1;
        console.log("---------->global.winkontrol"+global.winkontrol);
  
  
  
  
  
        const macCollection = collection(db, "macalan");
        const docRef = doc(macCollection, global.kullanicisifre);
  
        updateDoc(docRef, {
          Kazanma: 1
        })
          .then(() => {
            console.log("Belge başarıyla güncellendi.");
          })
          .catch((error) => {
            console.error("Belge güncellenirken bir hata oluştu: ", error);
          });
      }
  
  //eger en sonda iki oyunuda  kazanamadı ise
  const macCollection = collection(db, "macalan");
  
  if (colors.length === secretWord.length) {
    console.log("son satır ve kazanmadı")
  //kelime tahmin oyunu kısmı
  // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
  // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      // Tüm belgeleri döngüye alalım
      querySnapshot.forEach((docSnapshot) => {
        // Her belge için Kazanma alanını kontrol edelim
        const kazanma = docSnapshot.data().Kazanma;
        if (kazanma !== 1) {
          console.log("1yok");
          // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
          return;
        }
      });
      // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
      console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
       
  
    console.log("colors:"+colors)
    let greenScore = 0;
    let yellowScore = 0;
   
    // Her bir harfin rengini kontrol et
    for (let j = 0; j < secretWord.length; j++) {
     
      if (colors[colors.length-1][j] === 'green') {
        greenScore += 10;
      } else if (colors[colors.length-1][j] === 'yellow') {
        yellowScore += 5;
      }
    }
   
    console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
   let toppuan=greenScore+yellowScore;
   
  // Belirli bir belgeyi temsil eden bir referans oluşturun
  const docRef = doc(macCollection, global.kullanicisifre);
  
  // Yeni bir alan ekleyerek belgeyi güncelleyin
  setDoc(docRef, { puan: toppuan }, { merge: true })
    .then(() => { 
      
      console.log("Belge puan güncelleme başarıyla güncellendi!");
    
    })
    .catch((error) => {
      console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
    });
  
  //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
  
  const puanlar = [];
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
        if (data.hasOwnProperty("puan")) {
          const puan = data.puan;
          // Dizide puan değeri daha önce eklenmediyse ekleyin
        
            puanlar.push(puan);
        
        }
      });
  
      console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
  //puanlar listesi geldikten sonra bu isi yap
  
  //dizideki en yuksek puan bu kullanıcının ise kazandı
  let enYuksek = -1;
  
  // Her bir puanı kontrol et ve en yüksek puanı güncelle
  if(puanlar.length>1)
  {
  for (let i = 0; i < puanlar.length; i++) {
    if (puanlar[i] > enYuksek) {
      enYuksek = puanlar[i];
    }
  }
    
  }
  console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
  global.puan=enYuksek;
  
  
  
  
  
    })
  
  
  
    })
    .catch((error) => {
      console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
    });
  
  
  
  
  
  
  
  
  
  
  }
  
  
  
  // EN YUKSEK PUANLIYI KAZANDIRMA
  try {
    // Firestore sorgusu oluştur
    const queryRef = query(
      macCollection,
      where('puan', '==', global.puan) // "puan" alanı en yuksek
    );
  
    // Sorguyu çalıştır ve sonuçları al
    getDocs(queryRef)
      .then((querySnapshot) => {
        // Belgeleri dolaşarak şifre alanının değerlerini al
        const sifreValues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Şifre alanı varsa ve değeri varsa, değerini al
          if (data.hasOwnProperty('sifre') && data.sifre) {
            sifreValues.push(data.sifre);
          }
        });
  
        console.log("Şifre değerleri:", sifreValues);
  
        for(let don=0;don<sifreValues.length;don++)
        {
          if((global.kullanicisifre+"")==sifreValues[don])
          {//kazandı yap
            const docRef = doc(macCollection, global.kullanicisifre);
  
            updateDoc(docRef, {
              Kazanma: 1
            })
              .then(() => {
                console.log("Belge başarıyla güncellendi.");
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu: ", error);
              });
          }
        }
  
  
  
  
      })
      .catch((error) => {
        console.error('Belgeleri alma hatası en yuksek kısmı :', error);
      });
  } catch (error) {
    console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
  }
  
  
  
  
    };
  
    
  
    
  const [matris, setMatris] = useState(() => {
    const initialMatris = Array(4).fill(Array(4).fill(''));
    const updatedMatris = initialMatris.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
       
        return cell;
      });
    });
    return updatedMatris;
  });

  const hücreDegistir = (satir, sutun, deger) => {
    const yeniMatris = matris.map((row, rowIndex) => {
      if (rowIndex === satir) {
        return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
      } else {
        return row;
      }
    });
    setMatris(yeniMatris);
    console.log('yeniMatris', yeniMatris);

    for (let x = 0; x < yeniMatris.length; x++) {
      let satirkelime = '';
      for (let y = 0; y < yeniMatris.length; y++) {
        satirkelime += yeniMatris[x][y];
      }
      console.log('----' + satirkelime);
      if (satirkelime.length === yeniMatris.length) {
        setGuessWord(satirkelime);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

    
    
    const getColorStyle = (i, j) => {
      if (colors.length === 0) {
        return { backgroundColor: 'white' }; // Varsayılan renk
      }
    
      // Son tahminin indeksi
      const lastGuessIndex = guesses.length - 1;
    
      // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
      if (i === lastGuessIndex) {
        const renk = colors[lastGuessIndex][j];
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      } else {
        // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
        const renk = colors[i] ? colors[i][j] : 'white';
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      }
    };
    
    
    
    //ÇIKIŞ ALERT İSLEMİ
  
      const showAlert = () => {
        Alert.alert(
          'UYARI',
          'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
          [
            {
              text: 'Tamam',
               //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
  
               onPress: () => {
                // Tamam butonuna basıldığında yapılacak işlemler
                const macKoleksiyon = collection(db, "macalan"); 
                const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                deleteDoc(docRef) // Belgeyi silin
                  .then(() => {
                    console.log("Belge başarıyla silindi.");
                  })
                  .catch((error) => {
                    console.error("Belge silinirken bir hata oluştu: ", error);
                  });  
                  
                  
                  
                
                  //simdi kanalda 0 yapma kısmı
                 
  
  
              },
        
  
        
        
        
        
        },
            {
              text: 'İptal',
              onPress: () => console.log('İptal butonuna basıldı!'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      };
    
    
    
    
   
  
    
    
      return (
        <View style={styles.container}>
     
    
     <View style={styles.matris}>
        {matris.map((satir, i) => (
          <View key={i} style={styles.satir}>
            {satir.map((deger, j) => (
              <TextInput
                key={`${i * secretWord.length + j}`}
                style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
            
                 value={deger}
                onChangeText={(text) => hücreDegistir(i, j, text)}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={1}
              />
            ))}
          </View>
        ))}
      </View>
     
    
       <View>
          <Text>Oluşturulan Kelime: {guessWord}</Text>
          <Button 
    title="Tahmin Et" 
    onPress={() => {
      handleGuess();
      setTahminButtonBas(1);
    }} 
  />
  
  
        </View>
        
          
    
              
    <Button
      title="es"
      onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
       
          param1: 4,
          param2: global.kullanicisifre }
      )}
    /> 
  
  
  <TouchableOpacity style={styles.button2} onPress={showAlert}>
    <Button title=">" onPress={showAlert}/>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 4,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>



<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  
  <Text  style={styles.countdown2}>{countdown} saniye</Text>
  <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
   
  
        </View>
      );
    };
  
  






//kanal5 PAGE


const Kanal5page = ({navigation}) => {


  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

  useEffect(() => {
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        setInternetDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    };

    const handleConnectionChange = (state) => {
      if (!state.isConnected) {
        Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
        startCountdown();
      } else if (state.isConnected && vakitdolumu === 1) {
        setInternetDown(10);
        Alert.alert('Uyarılan kişi mağlup sayıldı!');
        updateFilteredDocuments();
      }
    };

    const updateFilteredDocuments = async () => {
      try {
        const macCollection = collection(db, "macalan");
        const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
        const querySnapshot = await getDocs(filteredDocsQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { Kazanma: 1 });
        });
        console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
      } catch (error) {
        console.error('Belgeleri güncellerken hata:', error);
        Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      setVakitDolumu(0);
      setInternetDown(10);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, [vakitdolumu]);

  useEffect(() => {
    if (internetdown === 0) {
      setVakitDolumu(1);
    }
  }, [internetdown]);
















  const [tahminbuttonbas, setTahminButtonBas] = useState(0);
  const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
  const [timeleft, setTimeleft] = useState(60);
  console.log("kanal5 page");
  //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
  //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
  //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
  //başlaılacaktır
 
  
   
  useEffect(() => {
    let interval;
    let countdownInterval;
    
    const startTimer = () => {
      console.log("****" + tahminbuttonbas);
    
      interval = setInterval(() => {
        if (tahminbuttonbas === 1 && timeleft !== 60) {
          setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
          setTahminButtonBas(0);
        }
      
        setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
        console.log("timeleft"+timeleft);
        if (timeleft === 0) {
          
          if (tahminbuttonbas !== 0) {
            console.log('Süre doldu ve tahmin butonuna basıldı.');
            setTimeleft(60);
            setTahminButtonBas(0);
            // Burada istediğiniz işlemleri yapabilirsiniz
          } else {
            console.log('Süre doldu ancak tahmin butonuna basılmadı.');
            // Burada istediğiniz işlemleri yapabilirsiniz
            alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
            startCountdown(); // Geri sayım fonksiyonunu başlat
          }    
          
         
        }
      }, 1000);
    };
    
    const startCountdown = () => {
      console.log("countdown başlatılıyor");
      let countdownValue = 10; // Başlangıçta 10 saniye
      const countdownInterval = setInterval(() => {
        if (countdownValue === 0) {
          clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
          // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
          alert('Süre doldu ve hala tahmin yapılmadı.');
          console.log("kim silinecek" + global.kullanicisifre);
          // Macalan oyuncuyu silme kısmı
          const macKoleksiyon = collection(db, "macalan");
          const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
          deleteDoc(docRef)
            .then(() => {
              console.log("Belge sayaç macalan başarıyla silindi.");
              setCountdown(10);
              setTimeleft(60);
              setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
            })
            .catch((error) => {
              console.error("Belge silinirken bir hata oluştu: ", error);
            });
        } else {
          setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
          countdownValue--;
        }
      }, 1000);
    };
  

    startTimer();
    
    // useEffect temizleyici fonksiyon
    return () => {
      clearInterval(interval);
     
    };
    }, [tahminbuttonbas,timeleft,countdown]); // tahminbuttonbas değiştiğinde yeniden etkinleştir
    
  
  
  
  
  
  
  
  const [globalrakipkelime, setGlobalRakipKelime] = useState("");
  
    //RENKLENDİRME İŞLEMLERİ
      // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
      const [secretWord, setSecretWord] = useState('');
      const [guessWord, setGuessWord] = useState('');
    
      // Tahmin geçmişini ve harf renklerini takip edin
      const [guesses, setGuesses] = useState([]);
      const [colors, setColors] = useState([]);
 
    
    
    
    
    
      //kelime listesi
    const  [listeKelimeler,setlistekelimeler]=useState([]);
    //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
    useEffect(() => {
      if (globalrakipkelime.length > 0) {
        setSecretWord(globalrakipkelime);
      }
    }, [globalrakipkelime]);
    
  
    //burada secret word mac eslesme alanından almaişlemleri
    // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
    //rakibin kelimesini alma işlemi
  useEffect(() => {
    // setInterval ile belirli aralıklarla işlem yapılacak
    const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
  
        try {
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("Belge bulunamadı.");
          } else{
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sordugukelime = data.Sordugukelime;
               if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
               {
               
                   console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                   setGlobalRakipKelime(sordugukelime);
           //        console("1111111:"+globalrakipkelime);
   
       }
                  });
          }
  
            
  
  
  
  
  
        } catch (error) {
            console.error("Error getting documents1: ", error);
        }
    }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
     // Component unmount edildiğinde interval'i temizle
     return () => clearInterval(interval);
    }, []); 
    
      //!!---------------------------------------------------*
  
      //burda bir saniyede bir kaybettimi kontrol et
  useEffect(() => {
    const interval = setInterval(async () => {
      const macKoleksiyon = collection(db, "macalan");
      const q = query(macKoleksiyon, where("Kazanma", "==", 1));
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (querySnapshot.empty) {
            console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
        } else{
         
          console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
          if(global.winkontrol==0)
          {global.winkontrol=global.winkontrol+1;
           if((global.kullanicisifre+"")===(doc.id+""))
            {
              alert("Kazandın");
            }   
            else{
              alert("Kaybettin");
            } 
          } 
  
        }
  
          
          
        });
      } catch (error) {
        console.error("Error getting documents2: ", error);
      }
    }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
  
    // Interval'i temizleme
    return () => clearInterval(interval);
  }, []);
  
    //deneme kelime listesini
    //!! kelime listesi ekleme isi
    
    useEffect(() => {
      const islenenKelimeler = words.split('\n');
      setlistekelimeler(islenenKelimeler);
    }, []);
    
    
    const handleGuess = () => {
  
    
    //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
  
    function checkMatch(word, list) {
      return list.some(item => word.localeCompare(item) === 0);
  }
  //listedeki tum harfleri buyut
  const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
  
  const result = checkMatch(guessWord, capitalizedWords);
  console.log(result);
  if(result==false)
  {
    alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
  }
  
  
  
   
    
      const newGuess = guessWord.toUpperCase();
      const newColors = [];
  
      for (let i = 0; i < secretWord.length; i++) {
        const secretChar = secretWord[i];
        const guessChar = newGuess[i];
  console.log("guesschar:"+guessChar)
  console.log("secretchar:"+secretChar)
        if (secretChar === guessChar) {
          newColors.push('green');
        } else if (secretWord.includes(guessChar)) {
          newColors.push('yellow');
        } else {
          newColors.push('gray');
        }
      }
  
      setGuesses([...guesses, newGuess]);
      setColors([...colors, newColors]);
  
      if (newGuess === secretWord) {
        alert('Tebrikler! Kazandınız!');
        global.winkontrol=global.winkontrol+1;
        console.log("---------->global.winkontrol"+global.winkontrol);
  
  
  
  
  
        const macCollection = collection(db, "macalan");
        const docRef = doc(macCollection, global.kullanicisifre);
  
        updateDoc(docRef, {
          Kazanma: 1
        })
          .then(() => {
            console.log("Belge başarıyla güncellendi.");
          })
          .catch((error) => {
            console.error("Belge güncellenirken bir hata oluştu: ", error);
          });
      }
  
  //eger en sonda iki oyunuda  kazanamadı ise
  const macCollection = collection(db, "macalan");
  
  if (colors.length === secretWord.length) {
    console.log("son satır ve kazanmadı")
  //kelime tahmin oyunu kısmı
  // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
  // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      // Tüm belgeleri döngüye alalım
      querySnapshot.forEach((docSnapshot) => {
        // Her belge için Kazanma alanını kontrol edelim
        const kazanma = docSnapshot.data().Kazanma;
        if (kazanma !== 1) {
          console.log("1yok");
          // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
          return;
        }
      });
      // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
      console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
       
  
    console.log("colors:"+colors)
    let greenScore = 0;
    let yellowScore = 0;
   
    // Her bir harfin rengini kontrol et
    for (let j = 0; j < secretWord.length; j++) {
     
      if (colors[colors.length-1][j] === 'green') {
        greenScore += 10;
      } else if (colors[colors.length-1][j] === 'yellow') {
        yellowScore += 5;
      }
    }
   
    console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
   let toppuan=greenScore+yellowScore;
   
  // Belirli bir belgeyi temsil eden bir referans oluşturun
  const docRef = doc(macCollection, global.kullanicisifre);
  
  // Yeni bir alan ekleyerek belgeyi güncelleyin
  setDoc(docRef, { puan: toppuan }, { merge: true })
    .then(() => { 
      
      console.log("Belge puan güncelleme başarıyla güncellendi!");
    
    })
    .catch((error) => {
      console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
    });
  
  //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
  
  const puanlar = [];
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
        if (data.hasOwnProperty("puan")) {
          const puan = data.puan;
          // Dizide puan değeri daha önce eklenmediyse ekleyin
        
            puanlar.push(puan);
        
        }
      });
  
      console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
  //puanlar listesi geldikten sonra bu isi yap
  
  //dizideki en yuksek puan bu kullanıcının ise kazandı
  let enYuksek = -1;
  
  // Her bir puanı kontrol et ve en yüksek puanı güncelle
  if(puanlar.length>1)
  {
  for (let i = 0; i < puanlar.length; i++) {
    if (puanlar[i] > enYuksek) {
      enYuksek = puanlar[i];
    }
  }
    
  }
  console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
  global.puan=enYuksek;
  
  
  
  
  
    })
  
  
  
    })
    .catch((error) => {
      console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
    });
  
  
  
  
  
  
  
  
  
  
  }
  
  
  
  // EN YUKSEK PUANLIYI KAZANDIRMA
  try {
    // Firestore sorgusu oluştur
    const queryRef = query(
      macCollection,
      where('puan', '==', global.puan) // "puan" alanı en yuksek
    );
  
    // Sorguyu çalıştır ve sonuçları al
    getDocs(queryRef)
      .then((querySnapshot) => {
        // Belgeleri dolaşarak şifre alanının değerlerini al
        const sifreValues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Şifre alanı varsa ve değeri varsa, değerini al
          if (data.hasOwnProperty('sifre') && data.sifre) {
            sifreValues.push(data.sifre);
          }
        });
  
        console.log("Şifre değerleri:", sifreValues);
  
        for(let don=0;don<sifreValues.length;don++)
        {
          if((global.kullanicisifre+"")==sifreValues[don])
          {//kazandı yap
            const docRef = doc(macCollection, global.kullanicisifre);
  
            updateDoc(docRef, {
              Kazanma: 1
            })
              .then(() => {
                console.log("Belge başarıyla güncellendi.");
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu: ", error);
              });
          }
        }
  
  
  
  
      })
      .catch((error) => {
        console.error('Belgeleri alma hatası en yuksek kısmı :', error);
      });
  } catch (error) {
    console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
  }
  
  
  
  
    };
  
    
  
    
  const [matris, setMatris] = useState(() => {
    const initialMatris = Array(5).fill(Array(5).fill(''));
    const updatedMatris = initialMatris.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
       
        return cell;
      });
    });
    return updatedMatris;
  });

  const hücreDegistir = (satir, sutun, deger) => {
    const yeniMatris = matris.map((row, rowIndex) => {
      if (rowIndex === satir) {
        return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
      } else {
        return row;
      }
    });
    setMatris(yeniMatris);
    console.log('yeniMatris', yeniMatris);

    for (let x = 0; x < yeniMatris.length; x++) {
      let satirkelime = '';
      for (let y = 0; y < yeniMatris.length; y++) {
        satirkelime += yeniMatris[x][y];
      }
      console.log('----' + satirkelime);
      if (satirkelime.length === yeniMatris.length) {
        setGuessWord(satirkelime);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

    
    
    const getColorStyle = (i, j) => {
      if (colors.length === 0) {
        return { backgroundColor: 'white' }; // Varsayılan renk
      }
    
      // Son tahminin indeksi
      const lastGuessIndex = guesses.length - 1;
    
      // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
      if (i === lastGuessIndex) {
        const renk = colors[lastGuessIndex][j];
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      } else {
        // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
        const renk = colors[i] ? colors[i][j] : 'white';
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      }
    };
    
    
    
    //ÇIKIŞ ALERT İSLEMİ
  
      const showAlert = () => {
        Alert.alert(
          'UYARI',
          'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
          [
            {
              text: 'Tamam',
               //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
  
               onPress: () => {
                // Tamam butonuna basıldığında yapılacak işlemler
                const macKoleksiyon = collection(db, "macalan"); 
                const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                deleteDoc(docRef) // Belgeyi silin
                  .then(() => {
                    console.log("Belge başarıyla silindi.");
                  })
                  .catch((error) => {
                    console.error("Belge silinirken bir hata oluştu: ", error);
                  });  
                  
                  
                  
                
                  //simdi kanalda 0 yapma kısmı
                 
  
  
              },
        
  
        
        
        
        
        },
            {
              text: 'İptal',
              onPress: () => console.log('İptal butonuna basıldı!'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      };
    
    
    
    
   
  
    
    
      return (
        <View style={styles.container}>
     
    
     <View style={styles.matris}>
        {matris.map((satir, i) => (
          <View key={i} style={styles.satir}>
            {satir.map((deger, j) => (
              <TextInput
                key={`${i * secretWord.length + j}`}
                style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
            
                 value={deger}
                onChangeText={(text) => hücreDegistir(i, j, text)}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={1}
              />
            ))}
          </View>
        ))}
      </View>
     
    
       <View>
          <Text>Oluşturulan Kelime: {guessWord}</Text>
          <Button 
    title="Tahmin Et" 
    onPress={() => {
      handleGuess();
      setTahminButtonBas(1);
    }} 
  />
  
  
        </View>
        
          
    
              
    <Button
      title="es"
      onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
       
          param1: 5,
          param2: global.kullanicisifre }
      )}
    /> 
  
  
  <TouchableOpacity style={styles.button2} onPress={showAlert}>
    <Button title=">" onPress={showAlert}/>
  </TouchableOpacity>


  <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 5,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>
  
<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  



  
  <Text  style={styles.countdown2}>{countdown} saniye</Text>
  <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
   
  
        </View>
      );
    };
  
  



  











//KANAL6PAGE


const Kanal6page = ({navigation}) => {

 
  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

  useEffect(() => {
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        setInternetDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    };

    const handleConnectionChange = (state) => {
      if (!state.isConnected) {
        Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
        startCountdown();
      } else if (state.isConnected && vakitdolumu === 1) {
        setInternetDown(10);
        Alert.alert('Uyarılan kişi mağlup sayıldı!');
        updateFilteredDocuments();
      }
    };

    const updateFilteredDocuments = async () => {
      try {
        const macCollection = collection(db, "macalan");
        const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
        const querySnapshot = await getDocs(filteredDocsQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { Kazanma: 1 });
        });
        console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
      } catch (error) {
        console.error('Belgeleri güncellerken hata:', error);
        Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      setVakitDolumu(0);
      setInternetDown(10);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, [vakitdolumu]);

  useEffect(() => {
    if (internetdown === 0) {
      setVakitDolumu(1);
    }
  }, [internetdown]);












  const [tahminbuttonbas, setTahminButtonBas] = useState(0);
  const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
  const [timeleft, setTimeleft] = useState(60);
  console.log("kanal6 page");
  //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
  //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
  //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
  //başlaılacaktır
 
  
   
  useEffect(() => {
    let interval;
    let countdownInterval;
    
    const startTimer = () => {
      console.log("****" + tahminbuttonbas);
    
      interval = setInterval(() => {
        if (tahminbuttonbas === 1 && timeleft !== 60) {
          setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
          setTahminButtonBas(0);
        }
      
        setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
        console.log("timeleft"+timeleft);
        if (timeleft === 0) {
          
          if (tahminbuttonbas !== 0) {
            console.log('Süre doldu ve tahmin butonuna basıldı.');
            setTimeleft(60);
            setTahminButtonBas(0);
            // Burada istediğiniz işlemleri yapabilirsiniz
          } else {
            console.log('Süre doldu ancak tahmin butonuna basılmadı.');
            // Burada istediğiniz işlemleri yapabilirsiniz
            alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
            startCountdown(); // Geri sayım fonksiyonunu başlat
          }    
          
         
        }
      }, 1000);
    };
    
    const startCountdown = () => {
      console.log("countdown başlatılıyor");
      let countdownValue = 10; // Başlangıçta 10 saniye
      const countdownInterval = setInterval(() => {
        if (countdownValue === 0) {
          clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
          // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
          alert('Süre doldu ve hala tahmin yapılmadı.');
          console.log("kim silinecek" + global.kullanicisifre);
          // Macalan oyuncuyu silme kısmı
          const macKoleksiyon = collection(db, "macalan");
          const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
          deleteDoc(docRef)
            .then(() => {
              console.log("Belge sayaç macalan başarıyla silindi.");
              setCountdown(10);
              setTimeleft(60);
              setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
            })
            .catch((error) => {
              console.error("Belge silinirken bir hata oluştu: ", error);
            });
        } else {
          setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
          countdownValue--;
        }
      }, 1000);
    };
  

    startTimer();
    
    // useEffect temizleyici fonksiyon
    return () => {
      clearInterval(interval);
     
    };
    }, [tahminbuttonbas,timeleft,countdown]); // tahminbuttonbas değiştiğinde yeniden etkinleştir
    
  
  
  
  
  
  
  
  
  const [globalrakipkelime, setGlobalRakipKelime] = useState("");
  
    //RENKLENDİRME İŞLEMLERİ
      // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
      const [secretWord, setSecretWord] = useState('');
      const [guessWord, setGuessWord] = useState('');
    
      // Tahmin geçmişini ve harf renklerini takip edin
      const [guesses, setGuesses] = useState([]);
      const [colors, setColors] = useState([]);
 
    
    
    
    
    
      //kelime listesi
    const  [listeKelimeler,setlistekelimeler]=useState([]);
    //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
    useEffect(() => {
      if (globalrakipkelime.length > 0) {
        setSecretWord(globalrakipkelime);
      }
    }, [globalrakipkelime]);
    
  
    //burada secret word mac eslesme alanından almaişlemleri
    // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
    //rakibin kelimesini alma işlemi
  useEffect(() => {
    // setInterval ile belirli aralıklarla işlem yapılacak
    const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
  
        try {
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("Belge bulunamadı.");
          } else{
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sordugukelime = data.Sordugukelime;
               if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
               {
               
                   console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                   setGlobalRakipKelime(sordugukelime);
           //        console("1111111:"+globalrakipkelime);
   
       }
                  });
          }
  
            
  
  
  
  
  
        } catch (error) {
            console.error("Error getting documents1: ", error);
        }
    }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
     // Component unmount edildiğinde interval'i temizle
     return () => clearInterval(interval);
    }, []); 
    
      //!!---------------------------------------------------*
  
      //burda bir saniyede bir kaybettimi kontrol et
  useEffect(() => {
    const interval = setInterval(async () => {
      const macKoleksiyon = collection(db, "macalan");
      const q = query(macKoleksiyon, where("Kazanma", "==", 1));
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (querySnapshot.empty) {
            console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
        } else{
         
          console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
          if(global.winkontrol==0)
          {global.winkontrol=global.winkontrol+1;
           if((global.kullanicisifre+"")===(doc.id+""))
            {
              alert("Kazandın");
            }   
            else{
              alert("Kaybettin");
            } 
          } 
  
        }
  
          
          
        });
      } catch (error) {
        console.error("Error getting documents2: ", error);
      }
    }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
  
    // Interval'i temizleme
    return () => clearInterval(interval);
  }, []);
  
    //deneme kelime listesini
    //!! kelime listesi ekleme isi
    
    useEffect(() => {
      const islenenKelimeler = words.split('\n');
      setlistekelimeler(islenenKelimeler);
    }, []);
    
    
    const handleGuess = () => {
  
    
    //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
  
    function checkMatch(word, list) {
      return list.some(item => word.localeCompare(item) === 0);
  }
  //listedeki tum harfleri buyut
  const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
  
  const result = checkMatch(guessWord, capitalizedWords);
  console.log(result);
  if(result==false)
  {
    alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
  }
  
  
  
   
    
      const newGuess = guessWord.toUpperCase();
      const newColors = [];
  
      for (let i = 0; i < secretWord.length; i++) {
        const secretChar = secretWord[i];
        const guessChar = newGuess[i];
  console.log("guesschar:"+guessChar)
  console.log("secretchar:"+secretChar)
        if (secretChar === guessChar) {
          newColors.push('green');
        } else if (secretWord.includes(guessChar)) {
          newColors.push('yellow');
        } else {
          newColors.push('gray');
        }
      }
  
      setGuesses([...guesses, newGuess]);
      setColors([...colors, newColors]);
  
      if (newGuess === secretWord) {
        alert('Tebrikler! Kazandınız!');
        global.winkontrol=global.winkontrol+1;
        console.log("---------->global.winkontrol"+global.winkontrol);
  
  
  
  
  
        const macCollection = collection(db, "macalan");
        const docRef = doc(macCollection, global.kullanicisifre);
  
        updateDoc(docRef, {
          Kazanma: 1
        })
          .then(() => {
            console.log("Belge başarıyla güncellendi.");
          })
          .catch((error) => {
            console.error("Belge güncellenirken bir hata oluştu: ", error);
          });
      }
  
  //eger en sonda iki oyunuda  kazanamadı ise
  const macCollection = collection(db, "macalan");
  
  if (colors.length === secretWord.length) {
    console.log("son satır ve kazanmadı")
  //kelime tahmin oyunu kısmı
  // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
  // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      // Tüm belgeleri döngüye alalım
      querySnapshot.forEach((docSnapshot) => {
        // Her belge için Kazanma alanını kontrol edelim
        const kazanma = docSnapshot.data().Kazanma;
        if (kazanma !== 1) {
          console.log("1yok");
          // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
          return;
        }
      });
      // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
      console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
       
  
    console.log("colors:"+colors)
    let greenScore = 0;
    let yellowScore = 0;
   
    // Her bir harfin rengini kontrol et
    for (let j = 0; j < secretWord.length; j++) {
     
      if (colors[colors.length-1][j] === 'green') {
        greenScore += 10;
      } else if (colors[colors.length-1][j] === 'yellow') {
        yellowScore += 5;
      }
    }
   
    console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
   let toppuan=greenScore+yellowScore;
   
  // Belirli bir belgeyi temsil eden bir referans oluşturun
  const docRef = doc(macCollection, global.kullanicisifre);
  
  // Yeni bir alan ekleyerek belgeyi güncelleyin
  setDoc(docRef, { puan: toppuan }, { merge: true })
    .then(() => { 
      
      console.log("Belge puan güncelleme başarıyla güncellendi!");
    
    })
    .catch((error) => {
      console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
    });
  
  //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
  
  const puanlar = [];
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
        if (data.hasOwnProperty("puan")) {
          const puan = data.puan;
          // Dizide puan değeri daha önce eklenmediyse ekleyin
        
            puanlar.push(puan);
        
        }
      });
  
      console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
  //puanlar listesi geldikten sonra bu isi yap
  
  //dizideki en yuksek puan bu kullanıcının ise kazandı
  let enYuksek = -1;
  
  // Her bir puanı kontrol et ve en yüksek puanı güncelle
  if(puanlar.length>1)
  {
  for (let i = 0; i < puanlar.length; i++) {
    if (puanlar[i] > enYuksek) {
      enYuksek = puanlar[i];
    }
  }
    
  }
  console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
  global.puan=enYuksek;
  
  
  
  
  
    })
  
  
  
    })
    .catch((error) => {
      console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
    });
  
  
  
  
  
  
  
  
  
  
  }
  
  
  
  // EN YUKSEK PUANLIYI KAZANDIRMA
  try {
    // Firestore sorgusu oluştur
    const queryRef = query(
      macCollection,
      where('puan', '==', global.puan) // "puan" alanı en yuksek
    );
  
    // Sorguyu çalıştır ve sonuçları al
    getDocs(queryRef)
      .then((querySnapshot) => {
        // Belgeleri dolaşarak şifre alanının değerlerini al
        const sifreValues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Şifre alanı varsa ve değeri varsa, değerini al
          if (data.hasOwnProperty('sifre') && data.sifre) {
            sifreValues.push(data.sifre);
          }
        });
  
        console.log("Şifre değerleri:", sifreValues);
  
        for(let don=0;don<sifreValues.length;don++)
        {
          if((global.kullanicisifre+"")==sifreValues[don])
          {//kazandı yap
            const docRef = doc(macCollection, global.kullanicisifre);
  
            updateDoc(docRef, {
              Kazanma: 1
            })
              .then(() => {
                console.log("Belge başarıyla güncellendi.");
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu: ", error);
              });
          }
        }
  
  
  
  
      })
      .catch((error) => {
        console.error('Belgeleri alma hatası en yuksek kısmı :', error);
      });
  } catch (error) {
    console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
  }
  
  
  
  
    };
  
    
  
    
  const [matris, setMatris] = useState(() => {
    const initialMatris = Array(6).fill(Array(6).fill(''));
    const updatedMatris = initialMatris.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
       
        return cell;
      });
    });
    return updatedMatris;
  });

  const hücreDegistir = (satir, sutun, deger) => {
    const yeniMatris = matris.map((row, rowIndex) => {
      if (rowIndex === satir) {
        return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
      } else {
        return row;
      }
    });
    setMatris(yeniMatris);
    console.log('yeniMatris', yeniMatris);

    for (let x = 0; x < yeniMatris.length; x++) {
      let satirkelime = '';
      for (let y = 0; y < yeniMatris.length; y++) {
        satirkelime += yeniMatris[x][y];
      }
      console.log('----' + satirkelime);
      if (satirkelime.length === yeniMatris.length) {
        setGuessWord(satirkelime);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

    
    
    const getColorStyle = (i, j) => {
      if (colors.length === 0) {
        return { backgroundColor: 'white' }; // Varsayılan renk
      }
    
      // Son tahminin indeksi
      const lastGuessIndex = guesses.length - 1;
    
      // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
      if (i === lastGuessIndex) {
        const renk = colors[lastGuessIndex][j];
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      } else {
        // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
        const renk = colors[i] ? colors[i][j] : 'white';
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      }
    };
    
    
    
    //ÇIKIŞ ALERT İSLEMİ
  
      const showAlert = () => {
        Alert.alert(
          'UYARI',
          'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
          [
            {
              text: 'Tamam',
               //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
  
               onPress: () => {
                // Tamam butonuna basıldığında yapılacak işlemler
                const macKoleksiyon = collection(db, "macalan"); 
                const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                deleteDoc(docRef) // Belgeyi silin
                  .then(() => {
                    console.log("Belge başarıyla silindi.");
                  })
                  .catch((error) => {
                    console.error("Belge silinirken bir hata oluştu: ", error);
                  });  
                  
                  
                  
                
                  //simdi kanalda 0 yapma kısmı
                 
  
  
              },
        
  
        
        
        
        
        },
            {
              text: 'İptal',
              onPress: () => console.log('İptal butonuna basıldı!'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      };
    
    
    
    
   
  
    
    
      return (
        <View style={styles.container}>
     
    
     <View style={styles.matris}>
        {matris.map((satir, i) => (
          <View key={i} style={styles.satir}>
            {satir.map((deger, j) => (
              <TextInput
                key={`${i * secretWord.length + j}`}
                style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
            
                 value={deger}
                onChangeText={(text) => hücreDegistir(i, j, text)}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={1}
              />
            ))}
          </View>
        ))}
      </View>
     
    
       <View>
          <Text>Oluşturulan Kelime: {guessWord}</Text>
          <Button 
    title="Tahmin Et" 
    onPress={() => {
      handleGuess();
      setTahminButtonBas(1);
    }} 
  />
  
  
        </View>
        
          
    
              
    <Button
      title="es"
      onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
       
          param1: 6,
          param2: global.kullanicisifre }
      )}
    /> 
  
  
  <TouchableOpacity style={styles.button2} onPress={showAlert}>
    <Button title=">" onPress={showAlert}/>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 6,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  
  
  <Text  style={styles.countdown2}>{countdown} saniye</Text>
  <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
   
  
        </View>
      );
    };
  
  





//KANAL7 PAGE


const Kanal7page = ({navigation}) => {

  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

  useEffect(() => {
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        setInternetDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    };

    const handleConnectionChange = (state) => {
      if (!state.isConnected) {
        Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
        startCountdown();
      } else if (state.isConnected && vakitdolumu === 1) {
        setInternetDown(10);
        Alert.alert('Uyarılan kişi mağlup sayıldı!');
        updateFilteredDocuments();
      }
    };

    const updateFilteredDocuments = async () => {
      try {
        const macCollection = collection(db, "macalan");
        const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
        const querySnapshot = await getDocs(filteredDocsQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { Kazanma: 1 });
        });
        console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
      } catch (error) {
        console.error('Belgeleri güncellerken hata:', error);
        Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      setVakitDolumu(0);
      setInternetDown(10);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, [vakitdolumu]);

  useEffect(() => {
    if (internetdown === 0) {
      setVakitDolumu(1);
    }
  }, [internetdown]);












  
  const [tahminbuttonbas, setTahminButtonBas] = useState(0);
  const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
  const [timeleft, setTimeleft] = useState(60);
  console.log("kanal7 page");
  //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
  //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
  //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
  //başlaılacaktır
 
  
   
  useEffect(() => {
    let interval;
    let countdownInterval;
    
    const startTimer = () => {
      console.log("****" + tahminbuttonbas);
    
      interval = setInterval(() => {
        if (tahminbuttonbas === 1 && timeleft !== 60) {
          setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
          setTahminButtonBas(0);
        }
      
        setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
        console.log("timeleft"+timeleft);
        if (timeleft === 0) {
          
          if (tahminbuttonbas !== 0) {
            console.log('Süre doldu ve tahmin butonuna basıldı.');
            setTimeleft(60);
            setTahminButtonBas(0);
            // Burada istediğiniz işlemleri yapabilirsiniz
          } else {
            console.log('Süre doldu ancak tahmin butonuna basılmadı.');
            // Burada istediğiniz işlemleri yapabilirsiniz
            alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
            startCountdown(); // Geri sayım fonksiyonunu başlat
          }    
          
         
        }
      }, 1000);
    };
    
    const startCountdown = () => {
      console.log("countdown başlatılıyor");
      let countdownValue = 10; // Başlangıçta 10 saniye
      const countdownInterval = setInterval(() => {
        if (countdownValue === 0) {
          clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
          // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
          alert('Süre doldu ve hala tahmin yapılmadı.');
          console.log("kim silinecek" + global.kullanicisifre);
          // Macalan oyuncuyu silme kısmı
          const macKoleksiyon = collection(db, "macalan");
          const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
          deleteDoc(docRef)
            .then(() => {
              console.log("Belge sayaç macalan başarıyla silindi.");
              setCountdown(10);
              setTimeleft(60);
              setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
            })
            .catch((error) => {
              console.error("Belge silinirken bir hata oluştu: ", error);
            });
        } else {
          setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
          countdownValue--;
        }
      }, 1000);
    };
  

    startTimer();
    
    // useEffect temizleyici fonksiyon
    return () => {
      clearInterval(interval);
     
    };
    }, [tahminbuttonbas,timeleft,countdown]); // tahminbuttonbas değiştiğinde yeniden etkinleştir
    
  
  
  
  
  
  
  
  
  const [globalrakipkelime, setGlobalRakipKelime] = useState("");
  
    //RENKLENDİRME İŞLEMLERİ
      // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
      const [secretWord, setSecretWord] = useState('');
      const [guessWord, setGuessWord] = useState('');
    
      // Tahmin geçmişini ve harf renklerini takip edin
      const [guesses, setGuesses] = useState([]);
      const [colors, setColors] = useState([]);
 
    
    
    
    
    
      //kelime listesi
    const  [listeKelimeler,setlistekelimeler]=useState([]);
    //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
    useEffect(() => {
      if (globalrakipkelime.length > 0) {
        setSecretWord(globalrakipkelime);
      }
    }, [globalrakipkelime]);
    
  
    //burada secret word mac eslesme alanından almaişlemleri
    // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
    //rakibin kelimesini alma işlemi
  useEffect(() => {
    // setInterval ile belirli aralıklarla işlem yapılacak
    const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
  
        try {
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("Belge bulunamadı.");
          } else{
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sordugukelime = data.Sordugukelime;
               if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
               {
               
                   console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                   setGlobalRakipKelime(sordugukelime);
           //        console("1111111:"+globalrakipkelime);
   
       }
                  });
          }
  
            
  
  
  
  
  
        } catch (error) {
            console.error("Error getting documents1: ", error);
        }
    }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
     // Component unmount edildiğinde interval'i temizle
     return () => clearInterval(interval);
    }, []); 
    
      //!!---------------------------------------------------*
  
      //burda bir saniyede bir kaybettimi kontrol et
  useEffect(() => {
    const interval = setInterval(async () => {
      const macKoleksiyon = collection(db, "macalan");
      const q = query(macKoleksiyon, where("Kazanma", "==", 1));
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (querySnapshot.empty) {
            console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
        } else{
         
          console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
          if(global.winkontrol==0)
          {global.winkontrol=global.winkontrol+1;
           if((global.kullanicisifre+"")===(doc.id+""))
            {
              alert("Kazandın");
            }   
            else{
              alert("Kaybettin");
            } 
          } 
  
        }
  
          
          
        });
      } catch (error) {
        console.error("Error getting documents2: ", error);
      }
    }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
  
    // Interval'i temizleme
    return () => clearInterval(interval);
  }, []);
  
    //deneme kelime listesini
    //!! kelime listesi ekleme isi
    
    useEffect(() => {
      const islenenKelimeler = words.split('\n');
      setlistekelimeler(islenenKelimeler);
    }, []);
    
    
    const handleGuess = () => {
  
    
    //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
  
    function checkMatch(word, list) {
      return list.some(item => word.localeCompare(item) === 0);
  }
  //listedeki tum harfleri buyut
  const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
  
  const result = checkMatch(guessWord, capitalizedWords);
  console.log(result);
  if(result==false)
  {
    alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
  }
  
  
  
   
    
      const newGuess = guessWord.toUpperCase();
      const newColors = [];
  
      for (let i = 0; i < secretWord.length; i++) {
        const secretChar = secretWord[i];
        const guessChar = newGuess[i];
  console.log("guesschar:"+guessChar)
  console.log("secretchar:"+secretChar)
        if (secretChar === guessChar) {
          newColors.push('green');
        } else if (secretWord.includes(guessChar)) {
          newColors.push('yellow');
        } else {
          newColors.push('gray');
        }
      }
  
      setGuesses([...guesses, newGuess]);
      setColors([...colors, newColors]);
  
      if (newGuess === secretWord) {
        alert('Tebrikler! Kazandınız!');
        global.winkontrol=global.winkontrol+1;
        console.log("---------->global.winkontrol"+global.winkontrol);
  
  
  
  
  
        const macCollection = collection(db, "macalan");
        const docRef = doc(macCollection, global.kullanicisifre);
  
        updateDoc(docRef, {
          Kazanma: 1
        })
          .then(() => {
            console.log("Belge başarıyla güncellendi.");
          })
          .catch((error) => {
            console.error("Belge güncellenirken bir hata oluştu: ", error);
          });
      }
  
  //eger en sonda iki oyunuda  kazanamadı ise
  const macCollection = collection(db, "macalan");
  
  if (colors.length === secretWord.length) {
    console.log("son satır ve kazanmadı")
  //kelime tahmin oyunu kısmı
  // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
  // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      // Tüm belgeleri döngüye alalım
      querySnapshot.forEach((docSnapshot) => {
        // Her belge için Kazanma alanını kontrol edelim
        const kazanma = docSnapshot.data().Kazanma;
        if (kazanma !== 1) {
          console.log("1yok");
          // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
          return;
        }
      });
      // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
      console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
       
  
    console.log("colors:"+colors)
    let greenScore = 0;
    let yellowScore = 0;
   
    // Her bir harfin rengini kontrol et
    for (let j = 0; j < secretWord.length; j++) {
     
      if (colors[colors.length-1][j] === 'green') {
        greenScore += 10;
      } else if (colors[colors.length-1][j] === 'yellow') {
        yellowScore += 5;
      }
    }
   
    console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
   let toppuan=greenScore+yellowScore;
   
  // Belirli bir belgeyi temsil eden bir referans oluşturun
  const docRef = doc(macCollection, global.kullanicisifre);
  
  // Yeni bir alan ekleyerek belgeyi güncelleyin
  setDoc(docRef, { puan: toppuan }, { merge: true })
    .then(() => { 
      
      console.log("Belge puan güncelleme başarıyla güncellendi!");
    
    })
    .catch((error) => {
      console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
    });
  
  //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
  
  const puanlar = [];
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
        if (data.hasOwnProperty("puan")) {
          const puan = data.puan;
          // Dizide puan değeri daha önce eklenmediyse ekleyin
        
            puanlar.push(puan);
        
        }
      });
  
      console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
  //puanlar listesi geldikten sonra bu isi yap
  
  //dizideki en yuksek puan bu kullanıcının ise kazandı
  let enYuksek = -1;
  
  // Her bir puanı kontrol et ve en yüksek puanı güncelle
  if(puanlar.length>1)
  {
  for (let i = 0; i < puanlar.length; i++) {
    if (puanlar[i] > enYuksek) {
      enYuksek = puanlar[i];
    }
  }
    
  }
  console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
  global.puan=enYuksek;
  
  
  
  
  
    })
  
  
  
    })
    .catch((error) => {
      console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
    });
  
  
  
  
  
  
  
  
  
  
  }
  
  
  
  // EN YUKSEK PUANLIYI KAZANDIRMA
  try {
    // Firestore sorgusu oluştur
    const queryRef = query(
      macCollection,
      where('puan', '==', global.puan) // "puan" alanı en yuksek
    );
  
    // Sorguyu çalıştır ve sonuçları al
    getDocs(queryRef)
      .then((querySnapshot) => {
        // Belgeleri dolaşarak şifre alanının değerlerini al
        const sifreValues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Şifre alanı varsa ve değeri varsa, değerini al
          if (data.hasOwnProperty('sifre') && data.sifre) {
            sifreValues.push(data.sifre);
          }
        });
  
        console.log("Şifre değerleri:", sifreValues);
  
        for(let don=0;don<sifreValues.length;don++)
        {
          if((global.kullanicisifre+"")==sifreValues[don])
          {//kazandı yap
            const docRef = doc(macCollection, global.kullanicisifre);
  
            updateDoc(docRef, {
              Kazanma: 1
            })
              .then(() => {
                console.log("Belge başarıyla güncellendi.");
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu: ", error);
              });
          }
        }
  
  
  
  
      })
      .catch((error) => {
        console.error('Belgeleri alma hatası en yuksek kısmı :', error);
      });
  } catch (error) {
    console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
  }
  
  
  
  
    };
  
    
  
    
  const [matris, setMatris] = useState(() => {
    const initialMatris = Array(7).fill(Array(7).fill(''));
    const updatedMatris = initialMatris.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
       
        return cell;
      });
    });
    return updatedMatris;
  });

  const hücreDegistir = (satir, sutun, deger) => {
    const yeniMatris = matris.map((row, rowIndex) => {
      if (rowIndex === satir) {
        return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
      } else {
        return row;
      }
    });
    setMatris(yeniMatris);
    console.log('yeniMatris', yeniMatris);

    for (let x = 0; x < yeniMatris.length; x++) {
      let satirkelime = '';
      for (let y = 0; y < yeniMatris.length; y++) {
        satirkelime += yeniMatris[x][y];
      }
      console.log('----' + satirkelime);
      if (satirkelime.length === yeniMatris.length) {
        setGuessWord(satirkelime);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

    
    
    const getColorStyle = (i, j) => {
      if (colors.length === 0) {
        return { backgroundColor: 'white' }; // Varsayılan renk
      }
    
      // Son tahminin indeksi
      const lastGuessIndex = guesses.length - 1;
    
      // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
      if (i === lastGuessIndex) {
        const renk = colors[lastGuessIndex][j];
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      } else {
        // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
        const renk = colors[i] ? colors[i][j] : 'white';
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      }
    };
    
    
    
    //ÇIKIŞ ALERT İSLEMİ
  
      const showAlert = () => {
        Alert.alert(
          'UYARI',
          'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
          [
            {
              text: 'Tamam',
               //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
  
               onPress: () => {
                // Tamam butonuna basıldığında yapılacak işlemler
                const macKoleksiyon = collection(db, "macalan"); 
                const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                deleteDoc(docRef) // Belgeyi silin
                  .then(() => {
                    console.log("Belge başarıyla silindi.");
                  })
                  .catch((error) => {
                    console.error("Belge silinirken bir hata oluştu: ", error);
                  });  
                  
                  
                  
                
                  //simdi kanalda 0 yapma kısmı
                 
  
  
              },
        
  
        
        
        
        
        },
            {
              text: 'İptal',
              onPress: () => console.log('İptal butonuna basıldı!'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      };
    
    
    
    
   
  
    
    
      return (
        <View style={styles.container}>
     
    
     <View style={styles.matris}>
        {matris.map((satir, i) => (
          <View key={i} style={styles.satir}>
            {satir.map((deger, j) => (
              <TextInput
                key={`${i * secretWord.length + j}`}
                style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
            
                 value={deger}
                onChangeText={(text) => hücreDegistir(i, j, text)}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={1}
              />
            ))}
          </View>
        ))}
      </View>
     
    
       <View>
          <Text>Oluşturulan Kelime: {guessWord}</Text>
          <Button 
    title="Tahmin Et" 
    onPress={() => {
      handleGuess();
      setTahminButtonBas(1);
    }} 
  />
  
  
        </View>
        
          
    
              
    <Button
      title="es"
      onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
       
          param1: 7,
          param2: global.kullanicisifre }
      )}
    /> 
  
  
  <TouchableOpacity style={styles.button2} onPress={showAlert}>
    <Button title=">" onPress={showAlert}/>
  </TouchableOpacity>
  
  
  <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 7,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  


  <Text  style={styles.countdown2}>{countdown} saniye</Text>
  <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
   
  
        </View>
      );
    };
  
  




  

//harf kısıtlamasız  // olmadı matris güncellenemiyor
const Hücre = ({ id, value, onTextChange }) => {
  return (
    <TextInput
      style={styles.hucre}
      value={value}
      onChangeText={(text) => onTextChange(id, text)}
      keyboardType="default"
      autoCapitalize="none"
      maxLength={1}
    />
  );
};

//harf kıısıtlamasız tarafı
//kanal42 page



const Kanal42page = ({navigation}) => {



  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

  useEffect(() => {
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        setInternetDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    };

    const handleConnectionChange = (state) => {
      if (!state.isConnected) {
        Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
        startCountdown();
      } else if (state.isConnected && vakitdolumu === 1) {
        setInternetDown(10);
        Alert.alert('Uyarılan kişi mağlup sayıldı!');
        updateFilteredDocuments();
      }
    };

    const updateFilteredDocuments = async () => {
      try {
        const macCollection = collection(db, "macalan");
        const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
        const querySnapshot = await getDocs(filteredDocsQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { Kazanma: 1 });
        });
        console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
      } catch (error) {
        console.error('Belgeleri güncellerken hata:', error);
        Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      setVakitDolumu(0);
      setInternetDown(10);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, [vakitdolumu]);

  useEffect(() => {
    if (internetdown === 0) {
      setVakitDolumu(1);
    }
  }, [internetdown]);















 
  const [tahminbuttonbas, setTahminButtonBas] = useState(0);
  const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
  const [timeleft, setTimeleft] = useState(60);
  console.log("kanal42 page");
  //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
  //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
  //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
  //başlaılacaktır
 
  
   
  useEffect(() => {
    let interval;
    let countdownInterval;
    
    const startTimer = () => {
      console.log("****" + tahminbuttonbas);
    
      interval = setInterval(() => {
        if (tahminbuttonbas === 1 && timeleft !== 60) {
          setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
          setTahminButtonBas(0);
        }
      
        setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
        console.log("timeleft"+timeleft);
        if (timeleft === 0) {
          
          if (tahminbuttonbas !== 0) {
            console.log('Süre doldu ve tahmin butonuna basıldı.');
            setTimeleft(60);
            setTahminButtonBas(0);
            // Burada istediğiniz işlemleri yapabilirsiniz
          } else {
            console.log('Süre doldu ancak tahmin butonuna basılmadı.');
            // Burada istediğiniz işlemleri yapabilirsiniz
            alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
            startCountdown(); // Geri sayım fonksiyonunu başlat
          }    
          
         
        }
      }, 1000);
    };
    
    const startCountdown = () => {
      console.log("countdown başlatılıyor");
      let countdownValue = 10; // Başlangıçta 10 saniye
      const countdownInterval = setInterval(() => {
        if (countdownValue === 0) {
          clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
          // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
          alert('Süre doldu ve hala tahmin yapılmadı.');
          console.log("kim silinecek" + global.kullanicisifre);
          // Macalan oyuncuyu silme kısmı
          const macKoleksiyon = collection(db, "macalan");
          const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
          deleteDoc(docRef)
            .then(() => {
              console.log("Belge sayaç macalan başarıyla silindi.");
              setCountdown(10);
              setTimeleft(60);
              setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
            })
            .catch((error) => {
              console.error("Belge silinirken bir hata oluştu: ", error);
            });
        } else {
          setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
          countdownValue--;
        }
      }, 1000);
    };
  

    startTimer();
    
    // useEffect temizleyici fonksiyon
    return () => {
      clearInterval(interval);
     
    };
    }, [tahminbuttonbas,timeleft,countdown]); // tahminbuttonbas değiştiğinde yeniden etkinleştir
    
  
  
  
  
  
  
  
  
  
  const [globalrakipkelime, setGlobalRakipKelime] = useState("");
  
    //RENKLENDİRME İŞLEMLERİ
      // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
      const [secretWord, setSecretWord] = useState('');
      const [guessWord, setGuessWord] = useState('');
    
      // Tahmin geçmişini ve harf renklerini takip edin
      const [guesses, setGuesses] = useState([]);
      const [colors, setColors] = useState([]);
 
    
    
    
    
    
      //kelime listesi
    const  [listeKelimeler,setlistekelimeler]=useState([]);
    //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
    useEffect(() => {
      if (globalrakipkelime.length > 0) {
        setSecretWord(globalrakipkelime);
      }
    }, [globalrakipkelime]);
    
  
    //burada secret word mac eslesme alanından almaişlemleri
    // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
    //rakibin kelimesini alma işlemi
  useEffect(() => {
    // setInterval ile belirli aralıklarla işlem yapılacak
    const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
  
        try {
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("Belge bulunamadı.");
          } else{
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sordugukelime = data.Sordugukelime;
               if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
               {
               
                   console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                   setGlobalRakipKelime(sordugukelime);
           //        console("1111111:"+globalrakipkelime);
   
       }
                  });
          }
  
            
  
  
  
  
  
        } catch (error) {
            console.error("Error getting documents1: ", error);
        }
    }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
     // Component unmount edildiğinde interval'i temizle
     return () => clearInterval(interval);
    }, []); 
    
      //!!---------------------------------------------------*
  
      //burda bir saniyede bir kaybettimi kontrol et
  useEffect(() => {
    const interval = setInterval(async () => {
      const macKoleksiyon = collection(db, "macalan");
      const q = query(macKoleksiyon, where("Kazanma", "==", 1));
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (querySnapshot.empty) {
            console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
        } else{
         
          console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
          if(global.winkontrol==0)
          {global.winkontrol=global.winkontrol+1;
           if((global.kullanicisifre+"")===(doc.id+""))
            {
              alert("Kazandın");
            }   
            else{
              alert("Kaybettin");
            } 
          } 
  
        }
  
          
          
        });
      } catch (error) {
        console.error("Error getting documents2: ", error);
      }
    }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
  
    // Interval'i temizleme
    return () => clearInterval(interval);
  }, []);
  
    //deneme kelime listesini
    //!! kelime listesi ekleme isi
    
    useEffect(() => {
      const islenenKelimeler = words.split('\n');
      setlistekelimeler(islenenKelimeler);
    }, []);
    
    
    const handleGuess = () => {
  
    
    //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
  
    function checkMatch(word, list) {
      return list.some(item => word.localeCompare(item) === 0);
  }
  //listedeki tum harfleri buyut
  const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
  
  const result = checkMatch(guessWord, capitalizedWords);
  console.log(result);
  if(result==false)
  {
    alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
  }
  
  
  
   
    
      const newGuess = guessWord.toUpperCase();
      const newColors = [];
  
      for (let i = 0; i < secretWord.length; i++) {
        const secretChar = secretWord[i];
        const guessChar = newGuess[i];
  console.log("guesschar:"+guessChar)
  console.log("secretchar:"+secretChar)
        if (secretChar === guessChar) {
          newColors.push('green');
        } else if (secretWord.includes(guessChar)) {
          newColors.push('yellow');
        } else {
          newColors.push('gray');
        }
      }
  
      setGuesses([...guesses, newGuess]);
      setColors([...colors, newColors]);
  
      if (newGuess === secretWord) {
        alert('Tebrikler! Kazandınız!');
        global.winkontrol=global.winkontrol+1;
        console.log("---------->global.winkontrol"+global.winkontrol);
  
  
  
  
  
        const macCollection = collection(db, "macalan");
        const docRef = doc(macCollection, global.kullanicisifre);
  
        updateDoc(docRef, {
          Kazanma: 1
        })
          .then(() => {
            console.log("Belge başarıyla güncellendi.");
          })
          .catch((error) => {
            console.error("Belge güncellenirken bir hata oluştu: ", error);
          });
      }
  
  //eger en sonda iki oyunuda  kazanamadı ise
  const macCollection = collection(db, "macalan");
  
  if (colors.length === secretWord.length) {
    console.log("son satır ve kazanmadı")
  //kelime tahmin oyunu kısmı
  // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
  // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      // Tüm belgeleri döngüye alalım
      querySnapshot.forEach((docSnapshot) => {
        // Her belge için Kazanma alanını kontrol edelim
        const kazanma = docSnapshot.data().Kazanma;
        if (kazanma !== 1) {
          console.log("1yok");
          // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
          return;
        }
      });
      // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
      console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
       
  
    console.log("colors:"+colors)
    let greenScore = 0;
    let yellowScore = 0;
   
    // Her bir harfin rengini kontrol et
    for (let j = 0; j < secretWord.length; j++) {
     
      if (colors[colors.length-1][j] === 'green') {
        greenScore += 10;
      } else if (colors[colors.length-1][j] === 'yellow') {
        yellowScore += 5;
      }
    }
   
    console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
   let toppuan=greenScore+yellowScore;
   
  // Belirli bir belgeyi temsil eden bir referans oluşturun
  const docRef = doc(macCollection, global.kullanicisifre);
  
  // Yeni bir alan ekleyerek belgeyi güncelleyin
  setDoc(docRef, { puan: toppuan }, { merge: true })
    .then(() => { 
      
      console.log("Belge puan güncelleme başarıyla güncellendi!");
    
    })
    .catch((error) => {
      console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
    });
  
  //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
  
  const puanlar = [];
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
        if (data.hasOwnProperty("puan")) {
          const puan = data.puan;
          // Dizide puan değeri daha önce eklenmediyse ekleyin
        
            puanlar.push(puan);
        
        }
      });
  
      console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
  //puanlar listesi geldikten sonra bu isi yap
  
  //dizideki en yuksek puan bu kullanıcının ise kazandı
  let enYuksek = -1;
  
  // Her bir puanı kontrol et ve en yüksek puanı güncelle
  if(puanlar.length>1)
  {
  for (let i = 0; i < puanlar.length; i++) {
    if (puanlar[i] > enYuksek) {
      enYuksek = puanlar[i];
    }
  }
    
  }
  console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
  global.puan=enYuksek;
  
  
  
  
  
    })
  
  
  
    })
    .catch((error) => {
      console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
    });
  
  
  
  
  
  
  
  
  
  
  }
  
  
  
  // EN YUKSEK PUANLIYI KAZANDIRMA
  try {
    // Firestore sorgusu oluştur
    const queryRef = query(
      macCollection,
      where('puan', '==', global.puan) // "puan" alanı en yuksek
    );
  
    // Sorguyu çalıştır ve sonuçları al
    getDocs(queryRef)
      .then((querySnapshot) => {
        // Belgeleri dolaşarak şifre alanının değerlerini al
        const sifreValues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Şifre alanı varsa ve değeri varsa, değerini al
          if (data.hasOwnProperty('sifre') && data.sifre) {
            sifreValues.push(data.sifre);
          }
        });
  
        console.log("Şifre değerleri:", sifreValues);
  
        for(let don=0;don<sifreValues.length;don++)
        {
          if((global.kullanicisifre+"")==sifreValues[don])
          {//kazandı yap
            const docRef = doc(macCollection, global.kullanicisifre);
  
            updateDoc(docRef, {
              Kazanma: 1
            })
              .then(() => {
                console.log("Belge başarıyla güncellendi.");
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu: ", error);
              });
          }
        }
  
  
  
  
      })
      .catch((error) => {
        console.error('Belgeleri alma hatası en yuksek kısmı :', error);
      });
  } catch (error) {
    console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
  }
  
  
  
  
    };
  
    
  
    
  const [matris, setMatris] = useState(() => {
    const initialMatris = Array(4).fill(Array(4).fill(''));
    const updatedMatris = initialMatris.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
       
        return cell;
      });
    });
    return updatedMatris;
  });

  const hücreDegistir = (satir, sutun, deger) => {
    const yeniMatris = matris.map((row, rowIndex) => {
      if (rowIndex === satir) {
        return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
      } else {
        return row;
      }
    });
    setMatris(yeniMatris);
    console.log('yeniMatris', yeniMatris);

    for (let x = 0; x < yeniMatris.length; x++) {
      let satirkelime = '';
      for (let y = 0; y < yeniMatris.length; y++) {
        satirkelime += yeniMatris[x][y];
      }
      console.log('----' + satirkelime);
      if (satirkelime.length === yeniMatris.length) {
        setGuessWord(satirkelime);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

    
    
    const getColorStyle = (i, j) => {
      if (colors.length === 0) {
        return { backgroundColor: 'white' }; // Varsayılan renk
      }
    
      // Son tahminin indeksi
      const lastGuessIndex = guesses.length - 1;
    
      // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
      if (i === lastGuessIndex) {
        const renk = colors[lastGuessIndex][j];
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      } else {
        // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
        const renk = colors[i] ? colors[i][j] : 'white';
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      }
    };
    
    
    
    //ÇIKIŞ ALERT İSLEMİ
  
      const showAlert = () => {
        Alert.alert(
          'UYARI',
          'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
          [
            {
              text: 'Tamam',
               //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
  
               onPress: () => {
                // Tamam butonuna basıldığında yapılacak işlemler
                const macKoleksiyon = collection(db, "macalan"); 
                const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                deleteDoc(docRef) // Belgeyi silin
                  .then(() => {
                    console.log("Belge başarıyla silindi.");
                  })
                  .catch((error) => {
                    console.error("Belge silinirken bir hata oluştu: ", error);
                  });  
                  
                  
                  
                
                  //simdi kanalda 0 yapma kısmı
                 
  
  
              },
        
  
        
        
        
        
        },
            {
              text: 'İptal',
              onPress: () => console.log('İptal butonuna basıldı!'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      };
    
    
    
    
   
  
    
    
      return (
        <View style={styles.container}>
     
    
     <View style={styles.matris}>
        {matris.map((satir, i) => (
          <View key={i} style={styles.satir}>
            {satir.map((deger, j) => (
              <TextInput
                key={`${i * secretWord.length + j}`}
                style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
            
                 value={deger}
                onChangeText={(text) => hücreDegistir(i, j, text)}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={1}
              />
            ))}
          </View>
        ))}
      </View>
     
    
       <View>
          <Text>Oluşturulan Kelime: {guessWord}</Text>
          <Button 
    title="Tahmin Et" 
    onPress={() => {
      handleGuess();
      setTahminButtonBas(1);
    }} 
  />
  
  
        </View>
        
          
    
              
    <Button
      title="es"
      onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
       
          param1: 42,
          param2: global.kullanicisifre }
      )}
    /> 
  
  
  <TouchableOpacity style={styles.button2} onPress={showAlert}>
    <Button title=">" onPress={showAlert}/>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 42,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>
  

<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  

  <Text  style={styles.countdown2}>{countdown} saniye</Text>
  <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
   
  
        </View>
      );
    };
  
  





//kanal52page



const Kanal52page = ({navigation}) => {







  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

  useEffect(() => {
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        setInternetDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    };

    const handleConnectionChange = (state) => {
      if (!state.isConnected) {
        Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
        startCountdown();
      } else if (state.isConnected && vakitdolumu === 1) {
        setInternetDown(10);
        Alert.alert('Uyarılan kişi mağlup sayıldı!');
        updateFilteredDocuments();
      }
    };

    const updateFilteredDocuments = async () => {
      try {
        const macCollection = collection(db, "macalan");
        const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
        const querySnapshot = await getDocs(filteredDocsQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { Kazanma: 1 });
        });
        console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
      } catch (error) {
        console.error('Belgeleri güncellerken hata:', error);
        Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      setVakitDolumu(0);
      setInternetDown(10);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, [vakitdolumu]);

  useEffect(() => {
    if (internetdown === 0) {
      setVakitDolumu(1);
    }
  }, [internetdown]);














  
  const [tahminbuttonbas, setTahminButtonBas] = useState(0);
  const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
  const [timeleft, setTimeleft] = useState(60);
  console.log("kanal52 page");
  //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
  //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
  //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
  //başlaılacaktır
 
  
   
  useEffect(() => {
    let interval;
    let countdownInterval;
    
    const startTimer = () => {
      console.log("****" + tahminbuttonbas);
    
      interval = setInterval(() => {
        if (tahminbuttonbas === 1 && timeleft !== 60) {
          setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
          setTahminButtonBas(0);
        }
      
        setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
        console.log("timeleft"+timeleft);
        if (timeleft === 0) {
          
          if (tahminbuttonbas !== 0) {
            console.log('Süre doldu ve tahmin butonuna basıldı.');
            setTimeleft(60);
            setTahminButtonBas(0);
            // Burada istediğiniz işlemleri yapabilirsiniz
          } else {
            console.log('Süre doldu ancak tahmin butonuna basılmadı.');
            // Burada istediğiniz işlemleri yapabilirsiniz
            alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
            startCountdown(); // Geri sayım fonksiyonunu başlat
          }    
          
         
        }
      }, 1000);
    };
    
    const startCountdown = () => {
      console.log("countdown başlatılıyor");
      let countdownValue = 10; // Başlangıçta 10 saniye
      const countdownInterval = setInterval(() => {
        if (countdownValue === 0) {
          clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
          // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
          alert('Süre doldu ve hala tahmin yapılmadı.');
          console.log("kim silinecek" + global.kullanicisifre);
          // Macalan oyuncuyu silme kısmı
          const macKoleksiyon = collection(db, "macalan");
          const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
          deleteDoc(docRef)
            .then(() => {
              console.log("Belge sayaç macalan başarıyla silindi.");
              setCountdown(10);
              setTimeleft(60);
              setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
            })
            .catch((error) => {
              console.error("Belge silinirken bir hata oluştu: ", error);
            });
        } else {
          setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
          countdownValue--;
        }
      }, 1000);
    };
  

    startTimer();
    
    // useEffect temizleyici fonksiyon
    return () => {
      clearInterval(interval);
     
    };
    }, [tahminbuttonbas,timeleft,countdown]); // tahminbuttonbas değiştiğinde yeniden etkinleştir
    
  
  
  
  
  
  
  const [globalrakipkelime, setGlobalRakipKelime] = useState("");
  
    //RENKLENDİRME İŞLEMLERİ
      // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
      const [secretWord, setSecretWord] = useState('');
      const [guessWord, setGuessWord] = useState('');
    
      // Tahmin geçmişini ve harf renklerini takip edin
      const [guesses, setGuesses] = useState([]);
      const [colors, setColors] = useState([]);
 
    
    
    
    
    
      //kelime listesi
    const  [listeKelimeler,setlistekelimeler]=useState([]);
    //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
    useEffect(() => {
      if (globalrakipkelime.length > 0) {
        setSecretWord(globalrakipkelime);
      }
    }, [globalrakipkelime]);
    
  
    //burada secret word mac eslesme alanından almaişlemleri
    // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
    //rakibin kelimesini alma işlemi
  useEffect(() => {
    // setInterval ile belirli aralıklarla işlem yapılacak
    const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
  
        try {
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("Belge bulunamadı.");
          } else{
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sordugukelime = data.Sordugukelime;
               if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
               {
               
                   console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                   setGlobalRakipKelime(sordugukelime);
           //        console("1111111:"+globalrakipkelime);
   
       }
                  });
          }
  
            
  
  
  
  
  
        } catch (error) {
            console.error("Error getting documents1: ", error);
        }
    }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
     // Component unmount edildiğinde interval'i temizle
     return () => clearInterval(interval);
    }, []); 
    
      //!!---------------------------------------------------*
  
      //burda bir saniyede bir kaybettimi kontrol et
  useEffect(() => {
    const interval = setInterval(async () => {
      const macKoleksiyon = collection(db, "macalan");
      const q = query(macKoleksiyon, where("Kazanma", "==", 1));
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (querySnapshot.empty) {
            console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
        } else{
         
          console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
          if(global.winkontrol==0)
          {global.winkontrol=global.winkontrol+1;
           if((global.kullanicisifre+"")===(doc.id+""))
            {
              alert("Kazandın");
            }   
            else{
              alert("Kaybettin");
            } 
          } 
  
        }
  
          
          
        });
      } catch (error) {
        console.error("Error getting documents2: ", error);
      }
    }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
  
    // Interval'i temizleme
    return () => clearInterval(interval);
  }, []);
  
    //deneme kelime listesini
    //!! kelime listesi ekleme isi
    
    useEffect(() => {
      const islenenKelimeler = words.split('\n');
      setlistekelimeler(islenenKelimeler);
    }, []);
    
    
    const handleGuess = () => {
  
    
    //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
  
    function checkMatch(word, list) {
      return list.some(item => word.localeCompare(item) === 0);
  }
  //listedeki tum harfleri buyut
  const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
  
  const result = checkMatch(guessWord, capitalizedWords);
  console.log(result);
  if(result==false)
  {
    alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
  }
  
  
  
   
    
      const newGuess = guessWord.toUpperCase();
      const newColors = [];
  
      for (let i = 0; i < secretWord.length; i++) {
        const secretChar = secretWord[i];
        const guessChar = newGuess[i];
  console.log("guesschar:"+guessChar)
  console.log("secretchar:"+secretChar)
        if (secretChar === guessChar) {
          newColors.push('green');
        } else if (secretWord.includes(guessChar)) {
          newColors.push('yellow');
        } else {
          newColors.push('gray');
        }
      }
  
      setGuesses([...guesses, newGuess]);
      setColors([...colors, newColors]);
  
      if (newGuess === secretWord) {
        alert('Tebrikler! Kazandınız!');
        global.winkontrol=global.winkontrol+1;
        console.log("---------->global.winkontrol"+global.winkontrol);
  
  
  
  
  
        const macCollection = collection(db, "macalan");
        const docRef = doc(macCollection, global.kullanicisifre);
  
        updateDoc(docRef, {
          Kazanma: 1
        })
          .then(() => {
            console.log("Belge başarıyla güncellendi.");
          })
          .catch((error) => {
            console.error("Belge güncellenirken bir hata oluştu: ", error);
          });
      }
  
  //eger en sonda iki oyunuda  kazanamadı ise
  const macCollection = collection(db, "macalan");
  
  if (colors.length === secretWord.length) {
    console.log("son satır ve kazanmadı")
  //kelime tahmin oyunu kısmı
  // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
  // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      // Tüm belgeleri döngüye alalım
      querySnapshot.forEach((docSnapshot) => {
        // Her belge için Kazanma alanını kontrol edelim
        const kazanma = docSnapshot.data().Kazanma;
        if (kazanma !== 1) {
          console.log("1yok");
          // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
          return;
        }
      });
      // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
      console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
       
  
    console.log("colors:"+colors)
    let greenScore = 0;
    let yellowScore = 0;
   
    // Her bir harfin rengini kontrol et
    for (let j = 0; j < secretWord.length; j++) {
     
      if (colors[colors.length-1][j] === 'green') {
        greenScore += 10;
      } else if (colors[colors.length-1][j] === 'yellow') {
        yellowScore += 5;
      }
    }
   
    console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
   let toppuan=greenScore+yellowScore;
   
  // Belirli bir belgeyi temsil eden bir referans oluşturun
  const docRef = doc(macCollection, global.kullanicisifre);
  
  // Yeni bir alan ekleyerek belgeyi güncelleyin
  setDoc(docRef, { puan: toppuan }, { merge: true })
    .then(() => { 
      
      console.log("Belge puan güncelleme başarıyla güncellendi!");
    
    })
    .catch((error) => {
      console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
    });
  
  //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
  
  const puanlar = [];
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
        if (data.hasOwnProperty("puan")) {
          const puan = data.puan;
          // Dizide puan değeri daha önce eklenmediyse ekleyin
        
            puanlar.push(puan);
        
        }
      });
  
      console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
  //puanlar listesi geldikten sonra bu isi yap
  
  //dizideki en yuksek puan bu kullanıcının ise kazandı
  let enYuksek = -1;
  
  // Her bir puanı kontrol et ve en yüksek puanı güncelle
  if(puanlar.length>1)
  {
  for (let i = 0; i < puanlar.length; i++) {
    if (puanlar[i] > enYuksek) {
      enYuksek = puanlar[i];
    }
  }
    
  }
  console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
  global.puan=enYuksek;
  
  
  
  
  
    })
  
  
  
    })
    .catch((error) => {
      console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
    });
  
  
  
  
  
  
  
  
  
  
  }
  
  
  
  // EN YUKSEK PUANLIYI KAZANDIRMA
  try {
    // Firestore sorgusu oluştur
    const queryRef = query(
      macCollection,
      where('puan', '==', global.puan) // "puan" alanı en yuksek
    );
  
    // Sorguyu çalıştır ve sonuçları al
    getDocs(queryRef)
      .then((querySnapshot) => {
        // Belgeleri dolaşarak şifre alanının değerlerini al
        const sifreValues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Şifre alanı varsa ve değeri varsa, değerini al
          if (data.hasOwnProperty('sifre') && data.sifre) {
            sifreValues.push(data.sifre);
          }
        });
  
        console.log("Şifre değerleri:", sifreValues);
  
        for(let don=0;don<sifreValues.length;don++)
        {
          if((global.kullanicisifre+"")==sifreValues[don])
          {//kazandı yap
            const docRef = doc(macCollection, global.kullanicisifre);
  
            updateDoc(docRef, {
              Kazanma: 1
            })
              .then(() => {
                console.log("Belge başarıyla güncellendi.");
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu: ", error);
              });
          }
        }
  
  
  
  
      })
      .catch((error) => {
        console.error('Belgeleri alma hatası en yuksek kısmı :', error);
      });
  } catch (error) {
    console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
  }
  
  
  
  
    };
  
    
  
    
  const [matris, setMatris] = useState(() => {
    const initialMatris = Array(5).fill(Array(5).fill(''));
    const updatedMatris = initialMatris.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
       
        return cell;
      });
    });
    return updatedMatris;
  });

  const hücreDegistir = (satir, sutun, deger) => {
    const yeniMatris = matris.map((row, rowIndex) => {
      if (rowIndex === satir) {
        return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
      } else {
        return row;
      }
    });
    setMatris(yeniMatris);
    console.log('yeniMatris', yeniMatris);

    for (let x = 0; x < yeniMatris.length; x++) {
      let satirkelime = '';
      for (let y = 0; y < yeniMatris.length; y++) {
        satirkelime += yeniMatris[x][y];
      }
      console.log('----' + satirkelime);
      if (satirkelime.length === yeniMatris.length) {
        setGuessWord(satirkelime);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

    
    
    const getColorStyle = (i, j) => {
      if (colors.length === 0) {
        return { backgroundColor: 'white' }; // Varsayılan renk
      }
    
      // Son tahminin indeksi
      const lastGuessIndex = guesses.length - 1;
    
      // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
      if (i === lastGuessIndex) {
        const renk = colors[lastGuessIndex][j];
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      } else {
        // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
        const renk = colors[i] ? colors[i][j] : 'white';
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      }
    };
    
    
    
    //ÇIKIŞ ALERT İSLEMİ
  
      const showAlert = () => {
        Alert.alert(
          'UYARI',
          'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
          [
            {
              text: 'Tamam',
               //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
  
               onPress: () => {
                // Tamam butonuna basıldığında yapılacak işlemler
                const macKoleksiyon = collection(db, "macalan"); 
                const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                deleteDoc(docRef) // Belgeyi silin
                  .then(() => {
                    console.log("Belge başarıyla silindi.");
                  })
                  .catch((error) => {
                    console.error("Belge silinirken bir hata oluştu: ", error);
                  });  
                  
                  
                  
                
                  //simdi kanalda 0 yapma kısmı
                 
  
  
              },
        
  
        
        
        
        
        },
            {
              text: 'İptal',
              onPress: () => console.log('İptal butonuna basıldı!'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      };
    
    
    
    
   
  
    
    
      return (
        <View style={styles.container}>
     
    
     <View style={styles.matris}>
        {matris.map((satir, i) => (
          <View key={i} style={styles.satir}>
            {satir.map((deger, j) => (
              <TextInput
                key={`${i * secretWord.length + j}`}
                style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
            
                 value={deger}
                onChangeText={(text) => hücreDegistir(i, j, text)}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={1}
              />
            ))}
          </View>
        ))}
      </View>
     
    
       <View>
          <Text>Oluşturulan Kelime: {guessWord}</Text>
          <Button 
    title="Tahmin Et" 
    onPress={() => {
      handleGuess();
      setTahminButtonBas(1);
    }} 
  />
  
  
        </View>
        
          
    
              
    <Button
      title="es"
      onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
       
          param1: 52,
          param2: global.kullanicisifre }
      )}
    /> 
  
  
  <TouchableOpacity style={styles.button2} onPress={showAlert}>
    <Button title=">" onPress={showAlert}/>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 52,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>
  

<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  

  <Text  style={styles.countdown2}>{countdown} saniye</Text>
  <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
   
  
        </View>
      );
    };
  
  
//kanal62 page 



const Kanal62page = ({navigation}) => {




  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

  useEffect(() => {
    const startCountdown = () => {
      const intervalId = setInterval(() => {
        setInternetDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    };

    const handleConnectionChange = (state) => {
      if (!state.isConnected) {
        Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
        startCountdown();
      } else if (state.isConnected && vakitdolumu === 1) {
        setInternetDown(10);
        Alert.alert('Uyarılan kişi mağlup sayıldı!');
        updateFilteredDocuments();
      }
    };

    const updateFilteredDocuments = async () => {
      try {
        const macCollection = collection(db, "macalan");
        const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
        const querySnapshot = await getDocs(filteredDocsQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { Kazanma: 1 });
        });
        console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
      } catch (error) {
        console.error('Belgeleri güncellerken hata:', error);
        Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      setVakitDolumu(0);
      setInternetDown(10);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, [vakitdolumu]);

  useEffect(() => {
    if (internetdown === 0) {
      setVakitDolumu(1);
    }
  }, [internetdown]);

















  
  const [tahminbuttonbas, setTahminButtonBas] = useState(0);
  const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
  const [timeleft, setTimeleft] = useState(60);
  console.log("kanal62 page");
  //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
  //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
  //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
  //başlaılacaktır
 
  
   
  useEffect(() => {
    let interval;
    let countdownInterval;
    
    const startTimer = () => {
      console.log("****" + tahminbuttonbas);
    
      interval = setInterval(() => {
        if (tahminbuttonbas === 1 && timeleft !== 60) {
          setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
          setTahminButtonBas(0);
        }
      
        setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
        console.log("timeleft"+timeleft);
        if (timeleft === 0) {
          
          if (tahminbuttonbas !== 0) {
            console.log('Süre doldu ve tahmin butonuna basıldı.');
            setTimeleft(60);
            setTahminButtonBas(0);
            // Burada istediğiniz işlemleri yapabilirsiniz
          } else {
            console.log('Süre doldu ancak tahmin butonuna basılmadı.');
            // Burada istediğiniz işlemleri yapabilirsiniz
            alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
            startCountdown(); // Geri sayım fonksiyonunu başlat
          }    
          
         
        }
      }, 1000);
    };
    
    const startCountdown = () => {
      console.log("countdown başlatılıyor");
      let countdownValue = 10; // Başlangıçta 10 saniye
      const countdownInterval = setInterval(() => {
        if (countdownValue === 0) {
          clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
          // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
          alert('Süre doldu ve hala tahmin yapılmadı.');
          console.log("kim silinecek" + global.kullanicisifre);
          // Macalan oyuncuyu silme kısmı
          const macKoleksiyon = collection(db, "macalan");
          const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
          deleteDoc(docRef)
            .then(() => {
              console.log("Belge sayaç macalan başarıyla silindi.");
              setCountdown(10);
              setTimeleft(60);
              setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
            })
            .catch((error) => {
              console.error("Belge silinirken bir hata oluştu: ", error);
            });
        } else {
          setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
          countdownValue--;
        }
      }, 1000);
    };
  

    startTimer();
    
    // useEffect temizleyici fonksiyon
    return () => {
      clearInterval(interval);
     
    };
    }, [tahminbuttonbas,timeleft,countdown]); // tahminbuttonbas değiştiğinde yeniden etkinleştir
    
  
  
  
  
  const [globalrakipkelime, setGlobalRakipKelime] = useState("");
  
    //RENKLENDİRME İŞLEMLERİ
      // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
      const [secretWord, setSecretWord] = useState('');
      const [guessWord, setGuessWord] = useState('');
    
      // Tahmin geçmişini ve harf renklerini takip edin
      const [guesses, setGuesses] = useState([]);
      const [colors, setColors] = useState([]);
 
    
    
    
    
    
      //kelime listesi
    const  [listeKelimeler,setlistekelimeler]=useState([]);
    //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
    useEffect(() => {
      if (globalrakipkelime.length > 0) {
        setSecretWord(globalrakipkelime);
      }
    }, [globalrakipkelime]);
    
  
    //burada secret word mac eslesme alanından almaişlemleri
    // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
    //rakibin kelimesini alma işlemi
  useEffect(() => {
    // setInterval ile belirli aralıklarla işlem yapılacak
    const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
  
        try {
            const querySnapshot = await getDocs(q);
  
            if (querySnapshot.empty) {
              console.log("Belge bulunamadı.");
          } else{
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const sordugukelime = data.Sordugukelime;
               if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
               {
               
                   console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                   setGlobalRakipKelime(sordugukelime);
           //        console("1111111:"+globalrakipkelime);
   
       }
                  });
          }
  
            
  
  
  
  
  
        } catch (error) {
            console.error("Error getting documents1: ", error);
        }
    }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
     // Component unmount edildiğinde interval'i temizle
     return () => clearInterval(interval);
    }, []); 
    
      //!!---------------------------------------------------*
  
      //burda bir saniyede bir kaybettimi kontrol et
  useEffect(() => {
    const interval = setInterval(async () => {
      const macKoleksiyon = collection(db, "macalan");
      const q = query(macKoleksiyon, where("Kazanma", "==", 1));
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (querySnapshot.empty) {
            console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
        } else{
         
          console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
          if(global.winkontrol==0)
          {global.winkontrol=global.winkontrol+1;
           if((global.kullanicisifre+"")===(doc.id+""))
            {
              alert("Kazandın");
            }   
            else{
              alert("Kaybettin");
            } 
          } 
  
        }
  
          
          
        });
      } catch (error) {
        console.error("Error getting documents2: ", error);
      }
    }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
  
    // Interval'i temizleme
    return () => clearInterval(interval);
  }, []);
  
    //deneme kelime listesini
    //!! kelime listesi ekleme isi
    
    useEffect(() => {
      const islenenKelimeler = words.split('\n');
      setlistekelimeler(islenenKelimeler);
    }, []);
    
    
    const handleGuess = () => {
  
    
    //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
  
    function checkMatch(word, list) {
      return list.some(item => word.localeCompare(item) === 0);
  }
  //listedeki tum harfleri buyut
  const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
  
  const result = checkMatch(guessWord, capitalizedWords);
  console.log(result);
  if(result==false)
  {
    alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
  }
  
  
  
   
    
      const newGuess = guessWord.toUpperCase();
      const newColors = [];
  
      for (let i = 0; i < secretWord.length; i++) {
        const secretChar = secretWord[i];
        const guessChar = newGuess[i];
  console.log("guesschar:"+guessChar)
  console.log("secretchar:"+secretChar)
        if (secretChar === guessChar) {
          newColors.push('green');
        } else if (secretWord.includes(guessChar)) {
          newColors.push('yellow');
        } else {
          newColors.push('gray');
        }
      }
  
      setGuesses([...guesses, newGuess]);
      setColors([...colors, newColors]);
  
      if (newGuess === secretWord) {
        alert('Tebrikler! Kazandınız!');
        global.winkontrol=global.winkontrol+1;
        console.log("---------->global.winkontrol"+global.winkontrol);
  
  
  
  
  
        const macCollection = collection(db, "macalan");
        const docRef = doc(macCollection, global.kullanicisifre);
  
        updateDoc(docRef, {
          Kazanma: 1
        })
          .then(() => {
            console.log("Belge başarıyla güncellendi.");
          })
          .catch((error) => {
            console.error("Belge güncellenirken bir hata oluştu: ", error);
          });
      }
  
  //eger en sonda iki oyunuda  kazanamadı ise
  const macCollection = collection(db, "macalan");
  
  if (colors.length === secretWord.length) {
    console.log("son satır ve kazanmadı")
  //kelime tahmin oyunu kısmı
  // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
  // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      // Tüm belgeleri döngüye alalım
      querySnapshot.forEach((docSnapshot) => {
        // Her belge için Kazanma alanını kontrol edelim
        const kazanma = docSnapshot.data().Kazanma;
        if (kazanma !== 1) {
          console.log("1yok");
          // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
          return;
        }
      });
      // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
      console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
       
  
    console.log("colors:"+colors)
    let greenScore = 0;
    let yellowScore = 0;
   
    // Her bir harfin rengini kontrol et
    for (let j = 0; j < secretWord.length; j++) {
     
      if (colors[colors.length-1][j] === 'green') {
        greenScore += 10;
      } else if (colors[colors.length-1][j] === 'yellow') {
        yellowScore += 5;
      }
    }
   
    console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
   let toppuan=greenScore+yellowScore;
   
  // Belirli bir belgeyi temsil eden bir referans oluşturun
  const docRef = doc(macCollection, global.kullanicisifre);
  
  // Yeni bir alan ekleyerek belgeyi güncelleyin
  setDoc(docRef, { puan: toppuan }, { merge: true })
    .then(() => { 
      
      console.log("Belge puan güncelleme başarıyla güncellendi!");
    
    })
    .catch((error) => {
      console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
    });
  
  //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
  
  const puanlar = [];
  
  getDocs(macCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
        if (data.hasOwnProperty("puan")) {
          const puan = data.puan;
          // Dizide puan değeri daha önce eklenmediyse ekleyin
        
            puanlar.push(puan);
        
        }
      });
  
      console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
  //puanlar listesi geldikten sonra bu isi yap
  
  //dizideki en yuksek puan bu kullanıcının ise kazandı
  let enYuksek = -1;
  
  // Her bir puanı kontrol et ve en yüksek puanı güncelle
  if(puanlar.length>1)
  {
  for (let i = 0; i < puanlar.length; i++) {
    if (puanlar[i] > enYuksek) {
      enYuksek = puanlar[i];
    }
  }
    
  }
  console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
  global.puan=enYuksek;
  
  
  
  
  
    })
  
  
  
    })
    .catch((error) => {
      console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
    });
  
  
  
  
  
  
  
  
  
  
  }
  
  
  
  // EN YUKSEK PUANLIYI KAZANDIRMA
  try {
    // Firestore sorgusu oluştur
    const queryRef = query(
      macCollection,
      where('puan', '==', global.puan) // "puan" alanı en yuksek
    );
  
    // Sorguyu çalıştır ve sonuçları al
    getDocs(queryRef)
      .then((querySnapshot) => {
        // Belgeleri dolaşarak şifre alanının değerlerini al
        const sifreValues = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Şifre alanı varsa ve değeri varsa, değerini al
          if (data.hasOwnProperty('sifre') && data.sifre) {
            sifreValues.push(data.sifre);
          }
        });
  
        console.log("Şifre değerleri:", sifreValues);
  
        for(let don=0;don<sifreValues.length;don++)
        {
          if((global.kullanicisifre+"")==sifreValues[don])
          {//kazandı yap
            const docRef = doc(macCollection, global.kullanicisifre);
  
            updateDoc(docRef, {
              Kazanma: 1
            })
              .then(() => {
                console.log("Belge başarıyla güncellendi.");
              })
              .catch((error) => {
                console.error("Belge güncellenirken bir hata oluştu: ", error);
              });
          }
        }
  
  
  
  
      })
      .catch((error) => {
        console.error('Belgeleri alma hatası en yuksek kısmı :', error);
      });
  } catch (error) {
    console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
  }
  
  
  
  
    };
  
    
  
    
  const [matris, setMatris] = useState(() => {
    const initialMatris = Array(6).fill(Array(6).fill(''));
    const updatedMatris = initialMatris.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
       
        return cell;
      });
    });
    return updatedMatris;
  });

  const hücreDegistir = (satir, sutun, deger) => {
    const yeniMatris = matris.map((row, rowIndex) => {
      if (rowIndex === satir) {
        return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
      } else {
        return row;
      }
    });
    setMatris(yeniMatris);
    console.log('yeniMatris', yeniMatris);

    for (let x = 0; x < yeniMatris.length; x++) {
      let satirkelime = '';
      for (let y = 0; y < yeniMatris.length; y++) {
        satirkelime += yeniMatris[x][y];
      }
      console.log('----' + satirkelime);
      if (satirkelime.length === yeniMatris.length) {
        setGuessWord(satirkelime);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

    
    
    const getColorStyle = (i, j) => {
      if (colors.length === 0) {
        return { backgroundColor: 'white' }; // Varsayılan renk
      }
    
      // Son tahminin indeksi
      const lastGuessIndex = guesses.length - 1;
    
      // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
      if (i === lastGuessIndex) {
        const renk = colors[lastGuessIndex][j];
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      } else {
        // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
        const renk = colors[i] ? colors[i][j] : 'white';
        return {
          backgroundColor: renk,
          // Diğer hucre stilleri
        };
      }
    };
    
    
    
    //ÇIKIŞ ALERT İSLEMİ
  
      const showAlert = () => {
        Alert.alert(
          'UYARI',
          'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
          [
            {
              text: 'Tamam',
               //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
  
               onPress: () => {
                // Tamam butonuna basıldığında yapılacak işlemler
                const macKoleksiyon = collection(db, "macalan"); 
                const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                deleteDoc(docRef) // Belgeyi silin
                  .then(() => {
                    console.log("Belge başarıyla silindi.");
                  })
                  .catch((error) => {
                    console.error("Belge silinirken bir hata oluştu: ", error);
                  });  
                  
                  
                  
                
                  //simdi kanalda 0 yapma kısmı
                 
  
  
              },
        
  
        
        
        
        
        },
            {
              text: 'İptal',
              onPress: () => console.log('İptal butonuna basıldı!'),
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      };
    
    
    
    
   
  
    
    
      return (
        <View style={styles.container}>
     
    
     <View style={styles.matris}>
        {matris.map((satir, i) => (
          <View key={i} style={styles.satir}>
            {satir.map((deger, j) => (
              <TextInput
                key={`${i * secretWord.length + j}`}
                style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
            
                 value={deger}
                onChangeText={(text) => hücreDegistir(i, j, text)}
                keyboardType="default"
                autoCapitalize="none"
                maxLength={1}
              />
            ))}
          </View>
        ))}
      </View>
     
    
       <View>
          <Text>Oluşturulan Kelime: {guessWord}</Text>
          <Button 
    title="Tahmin Et" 
    onPress={() => {
      handleGuess();
      setTahminButtonBas(1);
    }} 
  />
  
  
        </View>
        
          
    
              
    <Button
      title="es"
      onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
       
          param1: 62,
          param2: global.kullanicisifre }
      )}
    /> 
  
  
  <TouchableOpacity style={styles.button2} onPress={showAlert}>
    <Button title=">" onPress={showAlert}/>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 62,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>
  

<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  

  <Text  style={styles.countdown2}>{countdown} saniye</Text>
  <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
   
  
        </View>
      );
    };
  
  //kanal72page



  const Kanal72page = ({navigation}) => {


    
  const [internetdown, setInternetDown] = useState(10); // countdown değişkeni yerine internetdown olarak değiştirildi
  const [vakitdolumu, setVakitDolumu] = useState(0);

    useEffect(() => {
      const startCountdown = () => {
        const intervalId = setInterval(() => {
          setInternetDown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        return () => {
          clearInterval(intervalId);
        };
      };
  
      const handleConnectionChange = (state) => {
        if (!state.isConnected) {
          Alert.alert('Bağlantı kesildi! Geri sayım başlatılıyor...');
          startCountdown();
        } else if (state.isConnected && vakitdolumu === 1) {
          setInternetDown(10);
          Alert.alert('Uyarılan kişi mağlup sayıldı!');
          updateFilteredDocuments();
        }
      };
  
      const updateFilteredDocuments = async () => {
        try {
          const macCollection = collection(db, "macalan");
          const filteredDocsQuery = query(macCollection, where('sifre', '!=', global.kullanicisifre));
          const querySnapshot = await getDocs(filteredDocsQuery);
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, { Kazanma: 1 });
          });
          console.log('Filtrelenmiş belgelerin "Kazanma" alanları 1 olarak güncellendi.');
        } catch (error) {
          console.error('Belgeleri güncellerken hata:', error);
          Alert.alert('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
        setVakitDolumu(0);
        setInternetDown(10);
      };
  
      const unsubscribe = NetInfo.addEventListener(handleConnectionChange);
  
      return () => {
        unsubscribe();
      };
    }, [vakitdolumu]);
  
    useEffect(() => {
      if (internetdown === 0) {
        setVakitDolumu(1);
      }
    }, [internetdown]);




















    const [tahminbuttonbas, setTahminButtonBas] = useState(0);
    const [countdown, setCountdown] = useState(10); // Geri sayım için sayaç state'i
    const [timeleft, setTimeleft] = useState(60);
    console.log("kanal72 page");
    //!!!Oyun sırasında 1 dakika boyunca deneme yapılmadığı zaman uyarı gönderilecektir ve sağ üstte 10
    //saniye sayım başlatılacaktır. Sayım sonucunda uyarılan kişi mağlup sayılacaktır. Eğer süre bitmeden
    //önce oyuna devam ederse, süre kaldırılacaktır. Tekrar aynı durumun olması halinde süre sayımı tekrar
    //başlaılacaktır
   
    
     
    useEffect(() => {
      let interval;
      let countdownInterval;
      
      const startTimer = () => {
        console.log("****" + tahminbuttonbas);
      
        interval = setInterval(() => {
          if (tahminbuttonbas === 1 && timeleft !== 60) {
            setTimeleft(60); // timeleft'i yeniden 60 saniyeye ayarla
            setTahminButtonBas(0);
          }
        
          setTimeleft(prevTimeleft => prevTimeleft - 1); // timeleft'i güncelle
          console.log("timeleft"+timeleft);
          if (timeleft === 0) {
            
            if (tahminbuttonbas !== 0) {
              console.log('Süre doldu ve tahmin butonuna basıldı.');
              setTimeleft(60);
              setTahminButtonBas(0);
              // Burada istediğiniz işlemleri yapabilirsiniz
            } else {
              console.log('Süre doldu ancak tahmin butonuna basılmadı.');
              // Burada istediğiniz işlemleri yapabilirsiniz
              alert("TAHMİN YAP 10 SN SAYAÇ basladı ");
              startCountdown(); // Geri sayım fonksiyonunu başlat
            }    
            
           
          }
        }, 1000);
      };
      
      const startCountdown = () => {
        console.log("countdown başlatılıyor");
        let countdownValue = 10; // Başlangıçta 10 saniye
        const countdownInterval = setInterval(() => {
          if (countdownValue === 0) {
            clearInterval(countdownInterval); // Sayaç 0 olduğunda interval'ı temizle
            // Burada istenilen işlemleri yapabilirsiniz, örneğin süre dolduğunda bir uyarı gösterebilirsiniz.
            alert('Süre doldu ve hala tahmin yapılmadı.');
            console.log("kim silinecek" + global.kullanicisifre);
            // Macalan oyuncuyu silme kısmı
            const macKoleksiyon = collection(db, "macalan");
            const docRef = doc(macKoleksiyon, (global.kullanicisifre + ""));
            deleteDoc(docRef)
              .then(() => {
                console.log("Belge sayaç macalan başarıyla silindi.");
                setCountdown(10);
                setTimeleft(60);
                setTahminButtonBas(0); // Burada tahmin yapıldığı için tahmin button bas değeri sıfırlanıyor
              })
              .catch((error) => {
                console.error("Belge silinirken bir hata oluştu: ", error);
              });
          } else {
            setCountdown(countdownValue); // Her saniyede sayaç değeri azaltılıyor
            countdownValue--;
          }
        }, 1000);
      };
    
  
      startTimer();
      
      // useEffect temizleyici fonksiyon
      return () => {
        clearInterval(interval);
       
      };
      }, [tahminbuttonbas,timeleft,countdown]);
    
    
    
    
    
    const [globalrakipkelime, setGlobalRakipKelime] = useState("");
    
      //RENKLENDİRME İŞLEMLERİ
        // Gizli kelimeyi ve varsayılan tahmini kelimeyi ayarlayın
        const [secretWord, setSecretWord] = useState('');
        const [guessWord, setGuessWord] = useState('');
      
        // Tahmin geçmişini ve harf renklerini takip edin
        const [guesses, setGuesses] = useState([]);
        const [colors, setColors] = useState([]);
   
      
      
      
      
      
        //kelime listesi
      const  [listeKelimeler,setlistekelimeler]=useState([]);
      //!!!! secret word ve global rakip kelimeyi güncelleme güncelleme
      useEffect(() => {
        if (globalrakipkelime.length > 0) {
          setSecretWord(globalrakipkelime);
        }
      }, [globalrakipkelime]);
      
    
      //burada secret word mac eslesme alanından almaişlemleri
      // !!!!!!!!1  macalanındaki kelimeler(Sordugukelime) ile kelime kontrol yapılacak secretword bu belirleyecek
      //rakibin kelimesini alma işlemi
    useEffect(() => {
      // setInterval ile belirli aralıklarla işlem yapılacak
      const interval = setInterval(async () => {
          const macKoleksiyon = collection(db, "macalan");
          const q = query(macKoleksiyon, where("sifre", "!=", global.kullanicisifre));
    
          try {
              const querySnapshot = await getDocs(q);
    
              if (querySnapshot.empty) {
                console.log("Belge bulunamadı.");
            } else{
              querySnapshot.forEach((doc) => {
                  const data = doc.data();
                  const sordugukelime = data.Sordugukelime;
                 if(sordugukelime && globalrakipkelime.length<3 && global.errorlength==1)
                 {
                 
                     console.log("+++++++++++++++++++++++++++++++++++++Document ID:", doc.id, "Sordugukelime:", sordugukelime);
                     setGlobalRakipKelime(sordugukelime);
             //        console("1111111:"+globalrakipkelime);
     
         }
                    });
            }
    
              
    
    
    
    
    
          } catch (error) {
              console.error("Error getting documents1: ", error);
          }
      }, 600); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
       // Component unmount edildiğinde interval'i temizle
       return () => clearInterval(interval);
      }, []); 
      
        //!!---------------------------------------------------*
    
        //burda bir saniyede bir kaybettimi kontrol et
    useEffect(() => {
      const interval = setInterval(async () => {
        const macKoleksiyon = collection(db, "macalan");
        const q = query(macKoleksiyon, where("Kazanma", "==", 1));
    
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            if (querySnapshot.empty) {
              console.log("query snaspshot ***************   kazanma ile ilgili Belge bulunamadı.");
          } else{
           
            console.log("*****************----------**********------------------"+doc.id, " => ", doc.data());
            if(global.winkontrol==0)
            {global.winkontrol=global.winkontrol+1;
             if((global.kullanicisifre+"")===(doc.id+""))
              {
                alert("Kazandın");
              }   
              else{
                alert("Kaybettin");
              } 
            } 
    
          }
    
            
            
          });
        } catch (error) {
          console.error("Error getting documents2: ", error);
        }
      }, 1500); // Her bir saniyede bir çalışacak şekilde ayarlanmış interval
    
      // Interval'i temizleme
      return () => clearInterval(interval);
    }, []);
    
      //deneme kelime listesini
      //!! kelime listesi ekleme isi
      
      useEffect(() => {
        const islenenKelimeler = words.split('\n');
        setlistekelimeler(islenenKelimeler);
      }, []);
      
      
      const handleGuess = () => {
    
      
      //alert("bu bir geçerli kelimemidir:"+(listeKelimeler.includes(global.rakipkelime)+""))
    
      function checkMatch(word, list) {
        return list.some(item => word.localeCompare(item) === 0);
    }
    //listedeki tum harfleri buyut
    const capitalizedWords = listeKelimeler.map(word => word.toUpperCase());
    
    const result = checkMatch(guessWord, capitalizedWords);
    console.log(result);
    if(result==false)
    {
      alert("lütfen ğeçerli bir kelime giriniz:"+guessWord)
    }
    
    
    
     
      
        const newGuess = guessWord.toUpperCase();
        const newColors = [];
    
        for (let i = 0; i < secretWord.length; i++) {
          const secretChar = secretWord[i];
          const guessChar = newGuess[i];
    console.log("guesschar:"+guessChar)
    console.log("secretchar:"+secretChar)
          if (secretChar === guessChar) {
            newColors.push('green');
          } else if (secretWord.includes(guessChar)) {
            newColors.push('yellow');
          } else {
            newColors.push('gray');
          }
        }
    
        setGuesses([...guesses, newGuess]);
        setColors([...colors, newColors]);
    
        if (newGuess === secretWord) {
          alert('Tebrikler! Kazandınız!');
          global.winkontrol=global.winkontrol+1;
          console.log("---------->global.winkontrol"+global.winkontrol);
    
    
    
    
    
          const macCollection = collection(db, "macalan");
          const docRef = doc(macCollection, global.kullanicisifre);
    
          updateDoc(docRef, {
            Kazanma: 1
          })
            .then(() => {
              console.log("Belge başarıyla güncellendi.");
            })
            .catch((error) => {
              console.error("Belge güncellenirken bir hata oluştu: ", error);
            });
        }
    
    //eger en sonda iki oyunuda  kazanamadı ise
    const macCollection = collection(db, "macalan");
    
    if (colors.length === secretWord.length) {
      console.log("son satır ve kazanmadı")
    //kelime tahmin oyunu kısmı
    // Belirli bir koleksiyondaki tüm belgeleri almak için getDocs kullanabiliriz.
    // macCollection, tüm belgelerin bulunduğu koleksiyonu temsil ediyor.
    
    getDocs(macCollection)
      .then((querySnapshot) => {
        // Tüm belgeleri döngüye alalım
        querySnapshot.forEach((docSnapshot) => {
          // Her belge için Kazanma alanını kontrol edelim
          const kazanma = docSnapshot.data().Kazanma;
          if (kazanma !== 1) {
            console.log("1yok");
            // Eğer 1 olan bir belge bulduysak, bu noktada döngüyü kırabiliriz.
            return;
          }
        });
        // Eğer döngü tamamlandıysa ve hiçbir belgede Kazanma alanının değeri 1 değilse:
        console.log("Tüm belgelerde Kazanma alanının değeri 1 değil.");
         
    
      console.log("colors:"+colors)
      let greenScore = 0;
      let yellowScore = 0;
     
      // Her bir harfin rengini kontrol et
      for (let j = 0; j < secretWord.length; j++) {
       
        if (colors[colors.length-1][j] === 'green') {
          greenScore += 10;
        } else if (colors[colors.length-1][j] === 'yellow') {
          yellowScore += 5;
        }
      }
     
      console.log(`Yeşil renkli hücre puanı: ${greenScore}  Sarı renkli hücre puanı: ${yellowScore}`);
     let toppuan=greenScore+yellowScore;
     
    // Belirli bir belgeyi temsil eden bir referans oluşturun
    const docRef = doc(macCollection, global.kullanicisifre);
    
    // Yeni bir alan ekleyerek belgeyi güncelleyin
    setDoc(docRef, { puan: toppuan }, { merge: true })
      .then(() => { 
        
        console.log("Belge puan güncelleme başarıyla güncellendi!");
      
      })
      .catch((error) => {
        console.error("Belge puan güncelleme güncellenirken bir hata oluştu: ", error);
      });
    
    //puanını girdikten sonra diğerinin puanı ile kıyasla eğer puanı büyükse kazandı
    
    const puanlar = [];
    
    getDocs(macCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Belgelerde puan alanı varsa ve puanlar dizisine eklenirse
          if (data.hasOwnProperty("puan")) {
            const puan = data.puan;
            // Dizide puan değeri daha önce eklenmediyse ekleyin
          
              puanlar.push(puan);
          
          }
        });
    
        console.log("puanlar listesi:"+puanlar); // Tekrar eden elemanları içermeyen puanlar dizisi
    //puanlar listesi geldikten sonra bu isi yap
    
    //dizideki en yuksek puan bu kullanıcının ise kazandı
    let enYuksek = -1;
    
    // Her bir puanı kontrol et ve en yüksek puanı güncelle
    if(puanlar.length>1)
    {
    for (let i = 0; i < puanlar.length; i++) {
      if (puanlar[i] > enYuksek) {
        enYuksek = puanlar[i];
      }
    }
      
    }
    console.log("en yuksek puan:"+enYuksek);//burası enyuksek yazdırma
    global.puan=enYuksek;
    
    
    
    
    
      })
    
    
    
      })
      .catch((error) => {
        console.error("Belgelerpuan kontrolde alınırken bir hata oluştu: ", error);
      });
    
    
    
    
    
    
    
    
    
    
    }
    
    
    
    // EN YUKSEK PUANLIYI KAZANDIRMA
    try {
      // Firestore sorgusu oluştur
      const queryRef = query(
        macCollection,
        where('puan', '==', global.puan) // "puan" alanı en yuksek
      );
    
      // Sorguyu çalıştır ve sonuçları al
      getDocs(queryRef)
        .then((querySnapshot) => {
          // Belgeleri dolaşarak şifre alanının değerlerini al
          const sifreValues = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Şifre alanı varsa ve değeri varsa, değerini al
            if (data.hasOwnProperty('sifre') && data.sifre) {
              sifreValues.push(data.sifre);
            }
          });
    
          console.log("Şifre değerleri:", sifreValues);
    
          for(let don=0;don<sifreValues.length;don++)
          {
            if((global.kullanicisifre+"")==sifreValues[don])
            {//kazandı yap
              const docRef = doc(macCollection, global.kullanicisifre);
    
              updateDoc(docRef, {
                Kazanma: 1
              })
                .then(() => {
                  console.log("Belge başarıyla güncellendi.");
                })
                .catch((error) => {
                  console.error("Belge güncellenirken bir hata oluştu: ", error);
                });
            }
          }
    
    
    
    
        })
        .catch((error) => {
          console.error('Belgeleri alma hatası en yuksek kısmı :', error);
        });
    } catch (error) {
      console.error('Firestore sorgusu en yuksek kısmı oluşturma hatası:', error);
    }
    
    
    
    
      };
    
      
    
      
    const [matris, setMatris] = useState(() => {
      const initialMatris = Array(7).fill(Array(7).fill(''));
      const updatedMatris = initialMatris.map((row, rowIndex) => {
        return row.map((cell, columnIndex) => {
         
          return cell;
        });
      });
      return updatedMatris;
    });
  
    const hücreDegistir = (satir, sutun, deger) => {
      const yeniMatris = matris.map((row, rowIndex) => {
        if (rowIndex === satir) {
          return row.map((cell, cellIndex) => (cellIndex === sutun ? deger : cell));
        } else {
          return row;
        }
      });
      setMatris(yeniMatris);
      console.log('yeniMatris', yeniMatris);
  
      for (let x = 0; x < yeniMatris.length; x++) {
        let satirkelime = '';
        for (let y = 0; y < yeniMatris.length; y++) {
          satirkelime += yeniMatris[x][y];
        }
        console.log('----' + satirkelime);
        if (satirkelime.length === yeniMatris.length) {
          setGuessWord(satirkelime);
        }
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleGuess();
      }
    };
  
      
      
      const getColorStyle = (i, j) => {
        if (colors.length === 0) {
          return { backgroundColor: 'white' }; // Varsayılan renk
        }
      
        // Son tahminin indeksi
        const lastGuessIndex = guesses.length - 1;
      
        // Eğer bu satır son tahmin edilen satırsa, sadece bu satırın rengini güncelle
        if (i === lastGuessIndex) {
          const renk = colors[lastGuessIndex][j];
          return {
            backgroundColor: renk,
            // Diğer hucre stilleri
          };
        } else {
          // Eğer bu satır son tahmin edilen satır değilse, mevcut rengini koru
          const renk = colors[i] ? colors[i][j] : 'white';
          return {
            backgroundColor: renk,
            // Diğer hucre stilleri
          };
        }
      };
      
      
      
      //ÇIKIŞ ALERT İSLEMİ
    
        const showAlert = () => {
          Alert.alert(
            'UYARI',
            'Oyundan çıkmanız halinde oyunu kaybedeceksiniz. Çıkmak istiyorsanız onay butonuna basınız',
            [
              {
                text: 'Tamam',
                 //Tamam butonua basıldı ise oyuncu macalandan sil ama kanalda 0 yap aktif
    
                 onPress: () => {
                  // Tamam butonuna basıldığında yapılacak işlemler
                  const macKoleksiyon = collection(db, "macalan"); 
                  const docRef = doc(macKoleksiyon, (global.kullanicisifre+"")); // Silinmesi gereken belgeyi temsil eden referansı alın
                  deleteDoc(docRef) // Belgeyi silin
                    .then(() => {
                      console.log("Belge başarıyla silindi.");
                    })
                    .catch((error) => {
                      console.error("Belge silinirken bir hata oluştu: ", error);
                    });  
                    
                    
                    
                  
                    //simdi kanalda 0 yapma kısmı
                   
    
    
                },
          
    
          
          
          
          
          },
              {
                text: 'İptal',
                onPress: () => console.log('İptal butonuna basıldı!'),
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
        };
      
      
      
      
     
    
      
      
        return (
          <View style={styles.container}>
       
      
       <View style={styles.matris}>
          {matris.map((satir, i) => (
            <View key={i} style={styles.satir}>
              {satir.map((deger, j) => (
                <TextInput
                  key={`${i * secretWord.length + j}`}
                  style={[styles.hucre, getColorStyle(i, j)]} // Dinamik stil uygula
              
                   value={deger}
                  onChangeText={(text) => hücreDegistir(i, j, text)}
                  keyboardType="default"
                  autoCapitalize="none"
                  maxLength={1}
                />
              ))}
            </View>
          ))}
        </View>
       
      
         <View>
            <Text>Oluşturulan Kelime: {guessWord}</Text>
            <Button 
      title="Tahmin Et" 
      onPress={() => {
        handleGuess();
        setTahminButtonBas(1);
      }} 
    />
    
    
          </View>
          
            
      
                
      <Button
        title="es"
        onPress={() => navigation.navigate('esfunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
         
            param1: 72,
            param2: global.kullanicisifre }
        )}
      /> 
    
    
    <TouchableOpacity style={styles.button2} onPress={showAlert}>
      <Button title=">" onPress={showAlert}/>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.duello}  onPress={() => navigation.navigate('duellofunction', { // EkranAdi yerine gideceğiniz componentin adı yazın
     
     param1: 72,
     param2: global.kullanicisifre }
 )}>
        <Text style={styles.text}>duello</Text>
</TouchableOpacity>
    
<TouchableOpacity style={styles.gorme}  onPress={() => navigation.navigate('gormefunction')}>
        <Text style={styles.text}>o</Text>
</TouchableOpacity>
  



    <Text  style={styles.countdown2}>{countdown} saniye</Text>
    <Text  style={styles.countdown3}>{timeleft} sn anaekran</Text>
     
    
          </View>
        );
      };
    
    


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   B U login kısmına bir daha bak

const LoginEkrani = ({ navigation }) => {
  const [kontrol, setKontrol] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //giren kişinin kontrolü
 //soyle 
 const usersCollection = collection(db, 'kullanicilar');

  // Firestore'dan belgeleri al
  getDocs(usersCollection)
    .then((querySnapshot) => {
      // Tüm belge kimliklerini tutacak dizi
      const allDocumentIds = [];

      // Her belge için ID'yi al ve diziye ekle
      querySnapshot.forEach((doc) => {
        allDocumentIds.push(doc.id);
      });

      console.log("Tüm belge ID'leri:", allDocumentIds);


      console.log("allDocumentsId tipi:"+typeof(allDocumentIds[0]))
     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //belge idlerin içindeki password ve username  alanlarının valuesuna bak
      const documentidArray=  allDocumentIds.map((str) => parseInt(str, 10));
            for (let i = 0; i < documentidArray.length - 1; i++) {
              for (let j = i + 1; j < documentidArray.length; j++) {
                if (documentidArray[i] < documentidArray[j]) {
                  const temp = documentidArray[i];
                  documentidArray[i] = documentidArray[j];
                  documentidArray[j] = temp;
                }
              }
            }
//tüm document idlerin password ve username kısmını alma
for(let k=0;k<documentidArray.length;k++)
{


  
// Belirli bir belgenin referansını oluşturun
const belgeRef = doc(usersCollection, (k+""));

// Belgeyi getirin
getDoc(belgeRef)
  .then((belgeSnapshot) => {
    if (belgeSnapshot.exists()) {
      // Belge mevcutsa, içeriğine erişin
      const belgeVerisi = belgeSnapshot.data();
      const username2 = belgeVerisi.username;
      const password2 = belgeVerisi.password;
      
      console.log('Username:', username2);
      console.log('Password:', password2);
     
         if(username==username2)
         {
           if(password==password2)
           {setKontrol(1);

            console.log("!!!!!!!!!!!!!!!!!!!!!!  problem yok")
           }
         }


    } else {
      console.log('Belge bulunamadı.');
    }
  })
  .catch((error) => {
    console.error('Belge alınırken bir hata oluştu:', error);
  });







}


    })
    .catch((error) => {
      console.error("Hata oluştu:", error);
      alert('Lütfen daha sonra tekrar deneyin.');
    });



console.log("KONTROL DEGERİ"+kontrol)
  // global.kullanicisifre={password}
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>Giriş Ekranı</Text>
     
      <TextInput
        placeholder='Kullanıcı Adı'
        value={username}
        onChangeText={setUsername}
        style={styles.textInput}
      />
      <TextInput
        placeholder='Şifre'
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <Button
        title='ğiriş yap'
       
        onPress={() => {

          console.log({password}.password)
          global.kullanicisifre={password}.password;


          if (kontrol===1) {
          setKontrol(0);
          navigation.navigate('Oyunsecim');
        
        } else {
          alert('Giriş yapılamadı..İnternet bağlantınızı kontroledip tekrar deneyin!');
        }


          

        }}



      />
    </View>
  );
};




const KayıtOlEkrani = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


//benim elimdeki







  const addUserToFirestore = async () => {
    try {
      const usersCollection = collection(db, 'kullanicilar');
       // 'kullanicilar' koleksiyonuna erişin

            //burada tüm kullanıcıların document idlerini aldım
const allDocumentIds = [];

const querySnapshot = await getDocs(usersCollection);

querySnapshot.forEach((doc) => {
  allDocumentIds.push(doc.id);
});
console.log("+++++++++++++++++"+allDocumentIds)
console.log("++++++++++++++++++++++++++"+typeof(allDocumentIds[0]));
           //int diziyi büyükten küçüğe sıralama
              //intdizi sıralama BÜYÜKTEN KÜÇÜĞE
            const intDizi2=  allDocumentIds.map((str) => parseInt(str, 10));
            for (let i = 0; i < intDizi2.length - 1; i++) {
              for (let j = i + 1; j < intDizi2.length; j++) {
                if (intDizi2[i] < intDizi2[j]) {
                  const temp = intDizi2[i];
                  intDizi2[i] = intDizi2[j];
                  intDizi2[j] = temp;
                }
              }
            }
    //KALAN DOKUMAN IDLERİNE BAK VE BİR BÜYÜĞÜNE YENİ KULLANICIYI EKLE
    global.kullanicidocumentid=intDizi2[0]+1;
  






if(intDizi2.length==0)
{
  global.kullanicidocumentid=0;
}

    documentidata=global.kullanicidocumentid+"";
    const docRef = doc(usersCollection,documentidata);
    await setDoc(docRef, {
      username,
      password,
      // diğer kullanıcı bilgileri (isteğe bağlı)
    });
    console.log("Kullanıcı Firestore'a eklendi:", docRef.id);
    alert('Kayıt işlemi başarılı!');

      
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
      alert('Kayıt işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.baslik}>Kayıt Ol Sayfası</Text>
    <TextInput
      placeholder='Kullanıcı Adı'
      value={username}
      onChangeText={setUsername}
      style={styles.textInput}
    />
    <TextInput
      placeholder='Şifre'
      value={password}
      onChangeText={setPassword}
      style={styles.textInput}
    />
    <Button
      title='Kayıt Ol'
      onPress={addUserToFirestore}
    />
        </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Giris" component={GirisEkrani} />
        <Stack.Screen name="KayıtOl" component={KayıtOlEkrani} />
        <Stack.Screen name="Login" component={LoginEkrani} />
        <Stack.Screen name="Oyunsecim" component={Oyunsecimpage} /> 
        <Stack.Screen name="RastgeleHarf" component={RastgeleHarfpage} />
        <Stack.Screen name="HarfKisitlamasizOyun" component={HarfKisitlamasizOyunpage} />
        <Stack.Screen name="kanal4" component={Kanal4page} />
        <Stack.Screen name="kanal5" component={Kanal5page} /> 
        <Stack.Screen name="kanal6" component={Kanal6page} />
        <Stack.Screen name="kanal7" component={Kanal7page} />
         <Stack.Screen name="kanal42" component={Kanal42page} />
        <Stack.Screen name="kanal52" component={Kanal52page} /> 
        <Stack.Screen name="kanal62" component={Kanal62page} />
        <Stack.Screen name="kanal72" component={Kanal72page} />
        <Stack.Screen name="sorfunction" component={Sorkelime} />
        <Stack.Screen name="esfunction" component={Eslesme}/>
        <Stack.Screen name="gormefunction" component={Rakipgormescreen}/>
        <Stack.Screen name="Macalan"component={MacalanScreen} initialParams={{ sordugukelime: "Değer", kelimegirdimi: false }} />
        <Stack.Screen name="duellofunction" component={Duello}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    flex: 1,
    alignItems: 'center',
  },
  baslik: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
   
  },
  oyunSecimi: {
    fontSize: 16,
    marginTop: 20,
  },
matris: {
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 30, // Ekranın solundan ve sağında 10 birimlik boşluk bırakır
     // Ekranın altından 10 birimlik boşluk bırakır
    marginTop: 40, // Ekranın üst tarafından 20 birimlik boşluk bırakır
 
  },
  satir: {
    flexDirection: 'row',
    flex: 1,
  },
  hucre: {
// flex: 0.5, -- remove this line
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 8,
  //  position: 'absolute',
    color: 'black',
    fontWeight: "bold",
    // Add these properties for text input:
   // flex: 0.1, // Make each cell fill its available space
    alignSelf: 'center',
  },   paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },  countdown: {
    position: 'absolute',
    top: 10,
    right: 10,
  }, button2: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
},countdown2: {
    position: 'absolute',
    bottom: 10,
    right: 3,
  }
  ,
  countdown3: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },duello: {
    position: 'absolute',
    bottom: 15,
    left: 35,
    width: 50,
    height: 20,
    borderRadius: 35,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    
  },gorme: {
    position: 'absolute',
    bottom: 1,
    left: 75,
    width: 25,
    height: 15,
    borderRadius: 35,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
 
  
   
    
  },
  

});

export default App;













