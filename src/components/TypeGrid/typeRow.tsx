import { useEffect, useState } from "react";
import { NamedAPIResource, Type } from 'pokenode-ts';
import { EffDotContainer, TypeRowContainer } from "./styles";
import { TypeEffectiveness, TYPE_EFF } from "../../types";
import { TYPE_DATA } from "../../typeData";
import TypeDot from "../TypeDot";
import EffDot from "./effDot";
import { useSelector } from "react-redux";
import { getTypeGridHoverX, getTypeGridHoverY } from "../../store/appStatus/appStatusSelectors";

interface TypeRowProps {
  typeName: string;
  hoverCallback: (x?: string, y?: string) => void;
}

const TypeRow = (props: TypeRowProps) => {
  const { typeName, hoverCallback } = props;

  const hoverX = useSelector(getTypeGridHoverX);
  const hoverY = useSelector(getTypeGridHoverY);

  const [typeEff, setTypeEff] = useState<Record<string, TypeEffectiveness>>({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then((r) => r.json())
      .then((data: Type) => {
        console.log(data);
        // setTypeData(data);
        const _typeEff: Record<string, TypeEffectiveness> = {}
        data.damage_relations.double_damage_to.forEach((type: NamedAPIResource) => _typeEff[type.name] = TYPE_EFF.STRONG )
        data.damage_relations.half_damage_to.forEach((type: NamedAPIResource) => _typeEff[type.name] = TYPE_EFF.WEAK )
        data.damage_relations.no_damage_to.forEach((type: NamedAPIResource) => _typeEff[type.name] = TYPE_EFF.IMMUNE )
        setTypeEff(_typeEff)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <TypeRowContainer>
      <EffDotContainer
        onMouseEnter={() => hoverCallback(typeName, '')}
        onMouseLeave={() => hoverCallback(undefined, undefined)}
        hover={hoverX === typeName}
        typeColorX={hoverX === typeName && TYPE_DATA[hoverX]?.color}
      >
        <TypeDot type={typeName} size="small" />
      </EffDotContainer>
      {
        Object.keys(TYPE_DATA).map((type) => (
          <EffDotContainer
            key={type}
            onMouseEnter={() => hoverCallback(typeName, type)}
            onMouseLeave={() => hoverCallback(undefined, undefined)}
            hover={hoverY === type || hoverX === typeName}
            typeColorX={hoverX === typeName && TYPE_DATA[hoverX]?.color}
            typeColorY={hoverY === type && TYPE_DATA[hoverY]?.color}
          >
            <EffDot eff={typeEff?.[type]} />
          </EffDotContainer>
        ))
      }
    </TypeRowContainer>
  )
}

export default TypeRow;