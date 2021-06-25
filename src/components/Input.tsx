import React, { useState } from 'react'
import type {FC, ReactNode} from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { DefaultTheme } from '@/style/styled'
import { useSelector } from 'react-redux'
import { GlobalState } from '@/modules'

export type InputViewProps =  {
  children? : ReactNode
  
}

export const InputView : FC<InputViewProps> = ({ children})=>{
  const [text, onChangeText] = useState("");
  const {theme, userSchedules} = useSelector((state:GlobalState) => state);
  const {input} = styles(theme)
  return (
    <TextInput
      style={input}
      onChangeText={onChangeText}
      placeholder = "검색어를 입력하세요"
    />
  )
}
const styles = (theme:DefaultTheme) => {
  return StyleSheet.create({
      x:{},
      y:{},
      input:{flex:1}

  })
}
