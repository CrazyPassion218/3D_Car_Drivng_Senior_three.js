import
{
    CharacterStateBase,
    EndWalk,
    JumpRunning,
    Sprint,
    Walk,
} from './_stateLibrary';
import { ICharacterState } from '../../interfaces/ICharacterState';
import { Character } from '../Character';

export class DropRunning extends CharacterStateBase implements ICharacterState
{
    constructor(character: Character)
    {
        super(character);

        this.character.setArcadeVelocityTarget(0.8);
        this.animationLength = this.character.setAnimation('drop_running', 0.1);
    }

    public update(timeStep: number): void
    {
        super.update(timeStep);

        this.character.setCameraRelativeOrientationTarget();

        if (this.animationEnded(timeStep))
        {
            this.character.setState(Walk);
        }
    }

    public onInputChange(): void
    {
        if (this.noDirection())
        {
            this.character.setState(EndWalk);
        }

        if (this.anyDirection() && this.justPressed(this.character.actions.run))
        {
            this.character.setState(Sprint);
        }

        if (this.justPressed(this.character.actions.jump))
        {
            this.character.setState(JumpRunning);
        }
    }
}