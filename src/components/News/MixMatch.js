import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const data = [
  {
    id: "1",
    title:
      "Tự do thể hiện cá tính với các dòng đồng hồ Disney – Marvel Watch đặc sắc",
    date: "21/06/2024",
    image:
      "https://www.pnj.com.vn/blog/wp-content/uploads/2024/06/thumbnail1-tu-do-the-hien-ca-tinh-voi-cac-dong-dong-ho-disney-marvel-watch-dac-sac-218x150.jpg",
  },
  {
    id: "2",
    title:
      "Gợi ý 5 món trang sức đá quý PNJ sang trọng dành tặng đấng sinh thành nhân Ngày của cha 2024",
    date: "14/06/2024",
    image:
      "https://www.pnj.com.vn/blog/wp-content/uploads/2024/06/thumbnail1-goi-y-5-mon-trang-suc-da-quy-pnj-sang-trong-danh-tang-dang-sinh-thanh-nhan-ngay-cua-cha-2024-218x150.jpg",
  },
  {
    id: "3",
    title:
      "Món quà trang sức đồng điệu, cả nhà mình thêm gắn kết với BST Family Infinity",
    date: "14/06/2024",
    image:
      "https://www.pnj.com.vn/blog/wp-content/uploads/2024/06/thumbnail1-mon-qua-trang-suc-dong-dieu-ca-nha-minh-them-gan-ket-voi-bst-family-infinity-218x150.jpg",
  },
  {
    id: "4",
    title:
      "BST Gia đình thú cưng mới từ Disney|PNJ: Trang sức cho những “Sen” yêu “Boss” chính hiệu",
    date: "10/06/2024",
    image:
      "https://www.pnj.com.vn/blog/wp-content/uploads/2024/06/thumbnail1-bst-gia-dinh-thu-cung-moi-tu-disneypnj-trang-suc-cho-nhung-sen-yeu-boss-chinh-hieu-218x150.jpg",
  },
];

const MixMatch = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 75,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    fontSize: 12,
    color: "grey",
  },
});

export default MixMatch;
