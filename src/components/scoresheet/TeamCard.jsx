import React from "react";
import { InputGroup } from "react-bootstrap";

import { answerTypeToPillType } from "@libs/tournamentForms";
import { Direction } from "@libs/enums";
import { orderPlayers } from "@libs/scoresheet";
import Card from "@components/common/cards";
import Button from "@components/common/button";
import DropdownActions from "@components/common/DropdownActions";
import { Warning } from "@components/common/alerts";

const TeamCard = ({
  team,
  rules,
  onClickAnswer,
  lockedOut,
  onUndoNeg,
  onMovePlayer,
  playerOrderings,
  activePlayers,
  onToggleActive,
}) => (
  <Card
    title={<span className={lockedOut ? "text-muted" : ""}>{team.name}</span>}
    shadow={false}
  >
    {!lockedOut && activePlayers.length > rules.maxActivePlayersPerTeam && (
      <Warning>
        You should have up to {rules.maxActivePlayersPerTeam} active players at
        a time.
      </Warning>
    )}
    {lockedOut && (
      <Button
        className="d-block w-100"
        onClick={() => onUndoNeg(team.id)}
        type="danger"
      >
        Undo Neg
      </Button>
    )}
    {!lockedOut &&
      orderPlayers(team.players, playerOrderings).map((player, index) => {
        const isActive = activePlayers.indexOf(player.id) >= 0;
        const actions = [
          {
            label: isActive ? "Mark inactive" : "Mark active",
            onClick: () => onToggleActive(player),
          },
        ];
        if (team.players.length > 1) {
          actions.push(
            {
              label: "Move up",
              onClick: () =>
                onMovePlayer({
                  teamId: team.id,
                  index,
                  direction: Direction.Up,
                }),
            },
            {
              label: "Move down",
              onClick: () =>
                onMovePlayer({
                  teamId: team.id,
                  index,
                  direction: Direction.Down,
                }),
            }
          );
        }
        const dropdownActions = <DropdownActions actions={actions} />;
        return (
          <InputGroup className="mb-3" key={player.id}>
            <InputGroup.Text
              className={`w-100 overflow-auto d-flex justify-content-between ${
                isActive ? "" : "text-muted"
              }`}
            >
              <span className="overflow-auto">{player.name}</span>
              {dropdownActions}
            </InputGroup.Text>
            {isActive &&
              rules.tossupValues.map((tv) => (
                <Button
                  type={answerTypeToPillType[tv.answerType]}
                  key={tv.value}
                  className={rules.tossupValues.length >= 3 ? "btn-sm" : ""}
                  onClick={() =>
                    onClickAnswer({ playerId: player.id, value: tv.value })
                  }
                >
                  {tv.value}
                </Button>
              ))}
          </InputGroup>
        );
      })}
  </Card>
);

export default TeamCard;
