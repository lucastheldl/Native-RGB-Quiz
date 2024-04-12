import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export function Home() {
  const [rgb, setRgb] = useState<number[]>([30, 20, 30]);
  const [rgbInput, setRgbInput] = useState("");
  const [gameState, setGameState] = useState<"STANDBY" | "PLAYING">("STANDBY");

  function generateRgbValue() {
    return Math.floor(Math.random() * (255 + 1));
  }
  function getRgb() {
    let r = generateRgbValue();
    let g = generateRgbValue();
    let b = generateRgbValue();

    return [r, g, b];
  }
  function start() {
    //Pick a random color
    //disable start button
    //enable confirm button

    setGameState("PLAYING");

    let generatedRgb = getRgb();
    setRgb(generatedRgb);
    console.log(generatedRgb);
  }

  function confirm() {
    //check if input color match with random color
    //alert if the answer was correct or not
    //show answear
    //call method start again
    let slicedInput = rgbInput.split(",");
    const parsedInputArray = slicedInput.map(Number);

    if (slicedInput.length < 3) {
      window.alert("Valor RGB inválido");
      setGameState("STANDBY");
      setRgbInput("");
      return;
    }
    console.log(parsedInputArray);
    setGameState("STANDBY");

    if (JSON.stringify(parsedInputArray) !== JSON.stringify(rgb)) {
      window.alert("Valor Incorreto! A reposta correta é: " + rgb);
    } else {
      window.alert("Parabens! Você acertou o RGB desta cor!");
    }
    setRgbInput("");
  }
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
    },
  });

  return (
    <View className="relative flex flex-col justify-center items-center p-10 bg-slate-900 h-screen">
      <View
        className={`absolute top-0 left-0 h-80 w-screen `}
        style={dynamicStyles.container}
      />

      <Text className="text-slate-50 font-bold text-xl text-center mb-4">
        -Adivinhe o RGB-
      </Text>
      {gameState === "STANDBY" && (
        <View className="w-full ">
          <Button title="Começar" onPress={start} />
        </View>
      )}

      {gameState === "PLAYING" && (
        <View className="w-full ">
          <View className="flex flex-row items-center justify-center gap-2 p-10">
            <Text className="text-white font-bold text-xl">#</Text>
            <TextInput
              placeholder="Digite o valor R, G, B"
              className="flex-1 bg-slate-400 rounded-lg p-1"
              onChange={(e) => setRgbInput(e.nativeEvent.text)}
            />
          </View>
          <Button title="Confirmar" onPress={confirm} />
        </View>
      )}
    </View>
  );
}
